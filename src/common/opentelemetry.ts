import { W3CTraceContextPropagator } from '@opentelemetry/core'
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { BatchSpanProcessor, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { diag, DiagConsoleLogger, DiagLogLevel, metrics } from '@opentelemetry/api'
import { Resource } from '@opentelemetry/resources'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";
import { MeterProvider, ConsoleMetricExporter, PeriodicExportingMetricReader, View, ExplicitBucketHistogramAggregation, InstrumentType } from '@opentelemetry/sdk-metrics'
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'

// const opentelemetry = require("@opentelemetry/sdk-node");

// Set an internal logger for open telemetry to report any issues to your console/stdout
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.WARN)

export const initTelemetry = (config: {
    appName: string
    telemetryUrl: string
}): void => {
    // create an exporter to an open telemetry exporter. We create this collector instance locally using docker compose.
    const exporter = new OTLPTraceExporter({
        url: config.telemetryUrl, // e.g. "http://otel-collector:4318/v1/traces",
    })

    // We add some common meta data to every trace. The service name is important.
    const resource = Resource.default().merge(
        new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: config.appName,
            application: config.appName,
        })
    )

    // We use the node trace provider provided by open telemetry
    const provider = new NodeTracerProvider({ resource })

    // The batch span provider is more efficient than the basic provider. This will batch sends to
    // the exporter you have configured
    provider.addSpanProcessor(new BatchSpanProcessor(exporter))
    provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
    // provider.addSpanProcessor(new BatchSpanProcessor(new ZipkinExporter({ url: 'http://localhost:9411/api/v2/spans' })));

    // Initialize the propagator
    provider.register({
        propagator: new W3CTraceContextPropagator(),
    })


    // const metricReader = new PeriodicExportingMetricReader({
    //     exporter: new ConsoleMetricExporter(),
    //     exportIntervalMillis: 3000
    // })
    const prometheusReader = new PrometheusExporter({
        // endpoint: '/metrics',
        port: 9464
    });
    const histogramView = new View({
        aggregation: new ExplicitBucketHistogramAggregation([
            0, 1, 5, 10, 15, 20, 25, 30,
        ]),
        instrumentName: 'process.cpu.utilization',
        instrumentType: InstrumentType.OBSERVABLE_GAUGE,
    });

    const limitAttributesView = new View({
        // only export the attribute 'environment'
        attributeKeys: ['environment'],
        // apply the view to all instruments
        instrumentName: '*',
    });
    const metricReader = new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({ url: config.telemetryUrl }),
        exportIntervalMillis: 3000
    })
    const metricReader2 = new PeriodicExportingMetricReader({
        exporter: new ConsoleMetricExporter(),
        exportIntervalMillis: 3000
    })

    const myServiceMeterProvider = new MeterProvider({
        resource: resource,
        views: [limitAttributesView, histogramView]
    });

    const meter = myServiceMeterProvider.getMeter('test_cpu')
    const cpuUsed = meter.createObservableGauge('cpu_used', {
        description: 'Current CPU usage in percentage',
    })
    cpuUsed.addCallback((result) => {
        result.observe(100)
    })
    myServiceMeterProvider.addMetricReader(prometheusReader)

    myServiceMeterProvider.addMetricReader(metricReader)
    
    // myServiceMeterProvider.addMetricReader(metricReader2)
    metrics.setGlobalMeterProvider(myServiceMeterProvider)


    // const sdk = new opentelemetry.NodeSDK({
    //     traceExporter: exporter,
    //     instrumentations: [getNodeAutoInstrumentations()],
    // });

    // sdk
    //     .start()
    //     .then(() => {
    //         console.log("Tracing initialized");
    //     })
    //     .catch((error) => console.log("Error initializing tracing", error));

    // process.on("SIGTERM", () => {
    //     sdk
    //         .shutdown()
    //         .then(() => console.log("Tracing terminated"))
    //         .catch((error) => console.log("Error terminating tracing", error))
    //         .finally(() => process.exit(0));
    // });

    // Registering instrumentations / plugins
    registerInstrumentations({
        instrumentations: getNodeAutoInstrumentations(),
        meterProvider: myServiceMeterProvider
    })
}