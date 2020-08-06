import { nanoid } from "nanoid";
import { computed, nextTick, ref, unref, watch } from "vue";
import { TagModel } from "../models";

export default function (props) {
  const tagsData = ref<TagModel[]>([]);
  const input = ref("");
  const pastedInput = ref("");
  const delTagRef = ref<{ id: string }>(null);
  const { autosuggest, allowPaste, allowDuplicates, maxTags } = props;
  const showSuggestions = ref(false);
  const textInputRef = ref(null);
  const tagsCreated = ref(0);

  const style = computed(() => ({
    width: props.width,
  }));

  const reset = () => {
    tagsData.value = tagsData.value.map((t) => {
      delete t.highlight;
      return t;
    });
  };

  watch(input, (newValue) => {
    if (newValue && delTagRef.value) {
      delTagRef.value = null;
      tagsData.value = tagsData.value.map((t) => {
        delete t.highlight;
        return t;
      });
    } else if (newValue) {
      if (autosuggest && newValue.length > 1) {
        showSuggestions.value = true;
      } else if (autosuggest && newValue.length < 1) {
        showSuggestions.value = false;
      }
    } else {
      showSuggestions.value = false;
    }
  });

  const canAddTag = computed(() => {
    const duplicatesCheck = !allowDuplicates
      ? !tagsData.value.some((tag) => tag.name === input.value)
      : allowDuplicates;
    const maxAllowed = tagsCreated.value < maxTags;
    return duplicatesCheck && maxAllowed;
  });

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

  const handlePaste = (event: ClipboardEvent) => {
    // cancel the default operation
    event.stopPropagation();
    event.preventDefault();

    // get the clipboard data
    const data = event.clipboardData.getData("text");

    if (data) {
      const availableSlots = maxTags - tagsCreated.value;
      let items = data.split(allowPaste.delimiter);

      if (items.length > 1) {
        items = items.slice(0, Math.min(items.length, availableSlots));

        if (!allowDuplicates) {
          const existingItems = unref(tagsData).map((t) => t.name);
          const newSet = items.filter(
            (item) => existingItems.indexOf(item) < 0
          );

          items = [...new Set(newSet)] as string[];
        }

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
    handleAddTag(name);
    nextTick(() => {
      (textInputRef.value as HTMLElement).focus();
    });
  };

  return {
    tagsData,
    input,
    style,
    textInputRef,
    handleAddTag,
    handleRemoveTag,
    handleDelete,
    handleEscape,
    handlePaste,
    handleEditTag,
    showSuggestions,
    handleSuggestSelection,
  };
}