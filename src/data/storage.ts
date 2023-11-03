import { StorageItem } from "@/types/storage";

export const storage: StorageItem[] = [
  {
    id: 0,
    type: 1,
    name: "Dir 1",
    parentID: null,
    children: [
      {
        id: 1,
        parentID: 0,
        type: 1,
        name: "Dir 1-1",
        children: [
          {
            id: 2,
            type: 0,
            name: "File 1-1-1",
            parentID: 1,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    type: 1,
    name: "Dir 2",
    parentID: null,
    children: [
      {
        id: 4,
        type: 1,
        name: "Dir 2-1",
        parentID: null,
        children: [],
      },
      {
        id: 5,
        type: 0,
        name: "File 2-2",
        parentID: null,
      },
    ],
  },
  {
    id: 6,
    type: 0,
    name: "File 2",
    parentID: null,
  },
];
