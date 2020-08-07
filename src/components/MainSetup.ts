import { nanoid } from "nanoid";
import { computed, nextTick, ref, unref, watch } from "vue";
import { TagModel } from "../models";

interface PropModel {
  autosuggest: boolean;
  allowPaste: {
    delimiter: string;
  };
  allowDuplicates: boolean;
  maxTags: number;
  width: string;
  defaultTags?: string[];
}

export default function (props: PropModel) {
  // captured props
  const { autosuggest, allowPaste, allowDuplicates, maxTags, defaultTags } = props;
  const delTagRef = ref<{ id: string }>(null);
  // ref to store the tags data. init with default tags
  const tagsData = ref<TagModel[]>(defaultTags.map(name => ({
    id: nanoid(),
    name,
    value: name
  })));
  const textInputRef = ref(null);
  // ref for the input box
  const input = ref("");
  // ref to track the tags created by te user
  const tagsCreated = ref(0);
  // ref to display the suggestion pane
  const showSuggestions = ref(false);
  // ref to focus the suggestion pane
  const focusSuggestions = ref(false);

  const style = computed(() => ({
    width: props.width,
  }));

  const reset = () => {
    // remove highlight from all tags
    tagsData.value = tagsData.value.map(t => {
      delete t.highlight;
      return t;
    });
    // disable autosuggest
    showSuggestions.value = false;
  };

  watch(input, (newValue) => {

    if (delTagRef.value) {
      delTagRef.value = null;
      tagsData.value = tagsData.value.map((t) => {
        delete t.highlight;
        return t;
      });
    }

    if (newValue) {
      if (autosuggest && newValue.length > 0) {
        showSuggestions.value = true;
      } else if (autosuggest && newValue.length < 1) {
        showSuggestions.value = false;
      }
    } else {
      showSuggestions.value = false;
    }
  });

  // checks if a new tag can be added
  const canAddTag = computed(() => {
    const duplicatesCheck = !allowDuplicates
      ? !tagsData.value.some((tag) => tag.name === input.value)
      : allowDuplicates;
    const maxAllowed = tagsCreated.value < maxTags;
    return duplicatesCheck && maxAllowed;
  });

  // handler to add a new tag
  const handleAddTag = (name: string) => {
    if (!canAddTag.value) {
      return;
    }

    if (name) {
      tagsData.value = tagsData.value.concat({
        name,
        id: nanoid(),
        value: name,
      });
      input.value = "";
      showSuggestions.value = false;
      tagsCreated.value += 1;
    }
  };

  // handler to remove a tag
  const handleRemoveTag = (id: string) => {
    tagsData.value = tagsData.value.filter((t) => t.id !== id);
    tagsCreated.value -= 1;
  };

  const handleDelete = () => {
    if (input.value) {
      return;
    }

    if (delTagRef.value) {
      const tag = delTagRef.value;
      tagsData.value = tagsData.value.filter((t) => t.id !== tag.id);
      delTagRef.value = null;
      tagsCreated.value -= 1;
    } else if (tagsData.value.length) {
      const tag = tagsData.value[tagsData.value.length - 1];
      delTagRef.value = {
        id: tag.id,
      };
      tagsData.value = tagsData.value.map((t) => {
        if (t.id === tag.id) {
          return Object.assign({}, t, {
            highlight: true,
          });
        } else {
          return t;
        }
      });
    }
  };

  // handle to manage paste
  const handlePaste = (event: ClipboardEvent) => {
    // cancel the default operation
    event.stopPropagation();
    event.preventDefault();

    // get the clipboard data
    const data = event.clipboardData.getData("text");

    if (data) {
      // calculate available slots
      const availableSlots = maxTags - tagsCreated.value;

      // split string to create new tags
      let items = data.split(allowPaste.delimiter);

      if (items.length > 1) {
        // pick the items that can fit in the slot
        items = items.slice(0, Math.min(items.length, availableSlots));

        // check if duplicates are disallowed
        if (!allowDuplicates) {
          const existingItems = unref(tagsData).map((t) => t.name);
          const newSet = items.filter(
            (item) => existingItems.indexOf(item) < 0
          );

          // remove the duplicate entries
          items = [...new Set(newSet)] as string[];
        }

        // update tagsData with new items
        if (items.length) {
          tagsData.value = tagsData.value.concat(
            items.map((name) => ({
              name,
              value: name,
              id: nanoid(),
            }))
          );
          tagsCreated.value += items.length;
        }
      } else {
        tagsData.value = tagsData.value.concat({
          name: data,
          value: data,
          id: nanoid(),
        });
      }
    }
  };

  const handleEscape = () => reset();

  const handleEditTag = (id: string, newValue: string) => {
    tagsData.value = tagsData.value.map((tag) => {
      if (tag.id === id) {
        return Object.assign({}, tag, {
          name: newValue,
          value: newValue,
        });
      } else {
        return tag;
      }
    });
  };

  const handleSuggestSelection = (name: string) => {
    focusSuggestions.value = false;
    handleAddTag(name);
    nextTick(() => {
      (textInputRef.value as HTMLElement).focus();
    });
  };

  const handleKeydown = () => {
    const show = unref(showSuggestions);
    if (show) {
      focusSuggestions.value = true;
    }
  };

  const handleSuggestEsc = () => {
    (textInputRef.value as HTMLElement).focus();
    focusSuggestions.value = false;
    showSuggestions.value = false;
  }

  const handleFocus = () => {
    focusSuggestions.value = false;
  };

  return {
    tagsData,
    input,
    style,
    textInputRef,
    showSuggestions,
    focusSuggestions,
    handleKeydown,
    handleAddTag,
    handleRemoveTag,
    handleDelete,
    handleEscape,
    handlePaste,
    handleEditTag,
    handleSuggestSelection,
    handleSuggestEsc,
    handleFocus
  };
}