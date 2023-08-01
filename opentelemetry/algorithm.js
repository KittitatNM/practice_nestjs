const data = [
    {
        id: 244,
        name: 'A1',
        parentId: null,
        domain: null,
        logsource: [],
    },
    {
        id: 246,
        name: 'A1-1',
        parentId: 244,
        domain: {
            id: 19,
            name: 'DATS4',
        },
        logsource: [],
    },
    {
        id: 248,
        name: 'A1-1-1',
        parentId: 246,
        domain: null,
        logsource: [],
    },
    {
        id: 249,
        name: 'A1-1-2',
        parentId: 246,
        domain: null,
        logsource: [],
    },
    {
        id: 245,
        name: 'A2',
        parentId: null,
        domain: {
            id: 19,
            name: 'DATS4',
        },
        logsource: [],
    },
    {
        id: 247,
        name: 'A2-1',
        parentId: 245,
        domain: null,
        logsource: [],
    },
    {
        id: 12,
        name: 'GROUP_1',
        parentId: null,
        domain: null,
        logsource: [
            {
                id: 7,
                name: 'Logsource 5',
                domain: {
                    id: 16,
                    name: 'test',
                },
                isEnabled: false,
            },
            {
                id: 1,
                name: 'Logsource 6',
                domain: {
                    id: 2,
                    name: 'Test 2',
                },
                isEnabled: true,
            },
        ],
    },
    {
        id: 13,
        name: 'GROUP_1_1',
        parentId: 12,
        domain: null,
        logsource: [],
    },
    {
        id: 17,
        name: 'GROUP_1_1_1',
        parentId: 13,
        domain: null,
        logsource: [],
    },
    {
        id: 15,
        name: 'GROUP_1_2',
        parentId: 12,
        domain: null,
        logsource: [],
    },
    {
        id: 28,
        name: 'GROUP_1_4',
        parentId: 12,
        domain: null,
        logsource: [],
    },
    {
        id: 27,
        name: 'GROUP_2',
        parentId: null,
        domain: {
            id: 20,
            name: 'DATS2',
        },
        logsource: [
            {
                id: 9,
                name: 'Logsource 1',
                domain: {
                    id: 2,
                    name: 'Test 2',
                },
                isEnabled: true,
            },
            {
                id: 3,
                name: 'Logsource 3',
                domain: {
                    id: 2,
                    name: 'Test 2',
                },
                isEnabled: false,
            },
            {
                id: 8,
                name: 'Logsource 2',
                domain: {
                    id: 2,
                    name: 'Test 2',
                },
                isEnabled: false,
            },
        ],
    },
    {
        id: 29,
        name: 'GROUP_2_1',
        parentId: 27,
        domain: null,
        logsource: [
            {
                id: 6,
                name: 'Logsource 4',
                domain: null,
                isEnabled: true,
            },
        ],
    },
    {
        id: 30,
        name: 'GROUP_2_2',
        parentId: 27,
        domain: null,
        logsource: [],
    },
    {
        id: 33,
        name: 'GROUP_2_3',
        parentId: 27,
        domain: null,
        logsource: [],
    },
    {
        id: 1,
        name: 'Other',
        parentId: null,
        domain: null,
        logsource: [
            {
                id: 10,
                name: 'Logsource 7',
                domain: null,
                isEnabled: false,
            },
        ],
    },
];

const domain = [2, 16];

// // Create a map for quick lookup of items by their id
// const itemMap = new Map();
// data.forEach(item => itemMap.set(item.id, item));

// data.forEach(item => {
//     const parentId = item.parentId;
//     if (parentId !== null) {
//         const parentItem = itemMap.get(parentId);
//         if (parentItem) {
//             item.parent = parentItem;
//         } else {
//             item.parent = null;
//         }
//     } else {
//         item.parent = null;
//     }
// });

// // Print the parent of each item
// data.forEach(item => {
//     console.log(`Item: ${item.name}`);
//     if (item.parent) {
//         console.log(`Parent: ${item.parent.name}`);
//     } else {
//         console.log("Parent: None");
//     }
//     console.log();
// });

// // Create a map for quick lookup of items by their id
// const itemMap = new Map();
// data.forEach(item => itemMap.set(item.id, item));

// // Find the parent of each item and create a path
// data.forEach((item,index) => {
//     console.log(`******* row ${index} *******`)
//     const parentId = item.parentId;
//     if (parentId !== null) {
//         const parentItem = itemMap.get(parentId);
//         if (parentItem) {
//             item.parent = parentItem;
//             item.pathToParent = createPathToParent(item);
//         } else {
//             item.parent = null;
//             item.pathToParent = null;
//         }
//     } else {
//         item.parent = null;
//         item.pathToParent = item.name;
//     }
// });

// // Function to create a path to the parent item
// function createPathToParent(item) {
//     console.log(item);
//     const path = [item.name];
//     let parent = item.parent;
//     while (parent) {
//         path.unshift(parent.name);
//         parent = parent.parent;
//     }
//     return path.join(" > ");
// }

// // Print the path to parent for each item
// data.forEach(item => {
//     console.log(`Item: ${item.name}`);
//     if (item.pathToParent) {
//         console.log(`Path to Parent: ${item.pathToParent}`);
//     } else {
//         console.log("Path to Parent: None");
//     }
//     console.log();
// });

// // Create a map for quick lookup of items by their id
// const itemMap = new Map();
// data.forEach(item => itemMap.set(item.id, item));

// // Function to check if all parents have the same domain
// function allParentsHaveSameDomain(child) {
//     const childDomain = child.domain;
//     let parent = child.parent;
//     while (parent) {
//         if (!parent.domain || parent.domain.id !== childDomain.id) {
//             return false;
//         }
//         parent = parent.parent;
//     }
//     return true;
// }

// // Find the parent of each item
// data.forEach(item => {
//     const parentId = item.parentId;
//     if (parentId !== null) {
//         const parentItem = itemMap.get(parentId);
//         if (parentItem) {
//             item.parent = parentItem;
//         } else {
//             item.parent = null;
//         }
//     } else {
//         item.parent = null;
//     }
// });

// console.log(`add parent : `,JSON.stringify(data))

// // Check if all parents have the same domain for each item
// data.forEach(item => {
//     const allParentsSameDomain = allParentsHaveSameDomain(item);
//     console.log(`Item: ${item.name}`);
//     console.log(`All Parents Have Same Domain: ${allParentsSameDomain}`);
//     console.log();
// });

// const res=(data,id) => data
//   .filter((lsg) => lsg.id !== id)
//   .map((item) => {
//     console.log(`item : `,item)
//     const parentId = item.parentId;
//     if (parentId !== null) {
//       const parentItem = itemMap.get(parentId);
//       if (parentItem) {
//         // console.log(`has parent : `,parentItem)
//         item.parent = parentItem;
//       } else {
//         item.parent = null;
//       }
//     } else {
//       item.parent = null;
//     }
//   });

// console.log(res(data,248));
// console.log(JSON.stringify(data.filter((lsg) => lsg.id === 248)));

//--------------------- Work -------------------------------------

// // Create a map for quick lookup of items by their id
// const itemMap = new Map();
// data.forEach((item) => itemMap.set(item.id, item));

// data.forEach((item) => {
//   const parentId = item.parentId;
//   if (parentId !== null) {
//     const parentItem = itemMap.get(parentId);
//     if (parentItem) {
//       item.parent = parentItem;
//     } else {
//       item.parent = null;
//     }
//   } else {
//     item.parent = null;
//   }
// });

// const result = data.filter((lsg) => lsg.id === 248);
// // console.log(`result : `, result);

// const findDomainUnused = (data, result, domainId) => {
//   console.log(`Data : `, data);
//   const root = data;
//   if (root == null) {
//     return;
//   }
//   if (data.domain) {
//     // result.push(data.domain.id === domainId ? false : true);
//     // console.log('push')
//     if (data.domain.id === domainId) {
//       result.push(false);
//       console.log('false');
//     } else {
//       //   console.log('true');
//       //   result = true;
//       //   console.log(`result ${result}`);
//       result.push(true);
//       return;
//     }
//   } else {
//     result.push(false);
//     // console.log('push');
//     console.log('false');
//   }
//   findDomainUnused(root.parent, result, domainId);
// };
// let res = [];
// findDomainUnused(result[0], res, 19);

// console.log(res);

//--------------------- End Work -------------------------------------

// # CASE 1 : Parent has Domain
// Create a map for quick lookup of items by their id
// const itemMap = new Map();
// data.forEach((item) => itemMap.set(item.id, item));

// const result = data.filter((lsg) => lsg.id === 248);
// console.log(`result : `, result);

// const findDomainUnused = (data, result, domainId) => {
//   console.log(`Data : `, data);
//   const root = data;
//   if (root == null || !root) {
//     return;
//   }
//   if (data.domain) {
//     // result.push(data.domain.id === domainId ? false : true);
//     // console.log('push')
//     if (data.domain.id === domainId) {
//       result.push(false);
//       console.log('false');
//     } else {
//       //   console.log('true');
//       //   result = true;
//       //   console.log(`result ${result}`);
//       result.push(true);
//       return;
//     }
//   } else {
//     result.push(false);
//     // console.log('push');
//     console.log('false');
//   }
//   findDomainUnused(itemMap.get(root.parentId), result, domainId);
// };
// let res = [];
// findDomainUnused(result[0], res, 19);

// console.log(res);
//# CASE 2 : Logsource has Domain

const result = data.filter((lsg) => lsg.id === 12);
console.log(`result : `, result);
const lsDuplicateDomain = (domainId) => {
    return result[0].logsource.map((ls) => {
        if (!ls.domain) {
            return false;
        } else {
            if (ls.domain.id == domainId) return true;
            else return false;
        }
    });
};

console.log(lsDuplicateDomain(12));
