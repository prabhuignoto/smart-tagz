import { TagModel } from "../models";

const HandlePaste = (
  tagsData: TagModel[],
  pasteData: string,
  maxTags: number,
  tagsCreated: number,
  delimiter: string,
  allowDuplicates: boolean
) => {
  if (pasteData) {
    // calculate available slots
    const availableSlots = maxTags - tagsCreated;

    // split string to create new tags
    let items = delimiter ? pasteData.split(delimiter) : [];


    if (items.length > 1) {
      // pick the items that can fit in the slot
      items = items.slice(0, Math.min(items.length, availableSlots));

      // check if duplicates are disallowed
      if (!allowDuplicates) {
        const existingItems = tagsData.map((t) => t.name);
        const newSet = items.filter(
          (item) => existingItems.includes(item) === false
        );

        // remove the duplicate entries
        items = [...new Set(newSet)] as string[];
      }

      // update tagsData with new items
      if (items.length) {
        const newData = tagsData.concat(
          items.map((name) => ({
            name,
            value: name,
            id: Math.random().toString(16).slice(2),
          }))
        );
        return {
          newData,
          tagsCreated: tagsCreated + items.length
        }
      }
    } else {
      const newData = tagsData.concat({
        name: pasteData,
        value: pasteData,
        id: Math.random().toString(16).slice(2),
      });

      return {
        newData,
        tagsCreated: tagsCreated + 1
      }
    }
  }
};

export default HandlePaste;