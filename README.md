<!-- [![NPM Version][npm-image]][npm-url]-->
<!-- [![Downloads Stats][npm-downloads]][npm-url] -->
[![Build Status](https://dev.azure.com/prabhummurthy/smart-tagz/_apis/build/status/prabhuignoto.smart-tagz?branchName=master)](https://dev.azure.com/prabhummurthy/smart-tagz/_build/latest?definitionId=4&branchName=master)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/ece87afeb05c431fa375a8b98223290d)](https://www.codacy.com/manual/prabhuignoto/smart-tagz?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=prabhuignoto/smart-tagz&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/10074/projects/13324/branches/220204/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10074&pid=13324&bid=220204)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/prabhuignoto/smart-tagz.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/prabhuignoto/smart-tagz/context:javascript)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/prabhuignoto/smart-tagz)
[![Depfu](https://badges.depfu.com/badges/d21407f97842c6a8247d973f016cea62/overview.svg)](https://depfu.com/github/prabhuignoto/boxd?project_id=13611)

![logo](logo.png)
> Smart input tags for Vue 3

![app-home](app-home.png)

[![Edit smart-tagz](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/smart-tagz-pd32g?fontsize=14&hidenavigation=1&theme=dark)

## About

smart-tagz is a smart input tags components built for Vue 3.

## Features

✅ **Autosuggest** - Supports Autosuggest with easy keyboard selection.
✅ **Editable Tags** - Tags can be edited inline by double clicking on the tag.
✅ **Create tags on Paste** - Paste string with delimiters of your choice and the component will auto create the tags for you.
✅ **Easy tag deletion** - Delete tags easily with delete or backspace.
✅ **Quick delete** - Quickly delete all tags with CTRL + A, DEL or BACKSPACE.
✅ **Support for custom color schemes** - easy color scheme customization.
✅ **Composition API** - Built using the latest Composition API from Vue 3.
✅ **Typescript** - Built with Typescript.

## Installation

```sh
yarn install smart-tagz
```

or

```sh
npm install smart-tagz
```

## Demos

[https://smart-tagz.vercel.app/](https://smart-tagz.vercel.app/)

## Getting Started

smart-tagz has some great defaults to get you started quickly. Please check the props list for all options.

```sh
<template>
  <smart-tagz
    autosuggest
    editable
    inputPlaceholder="Select Countries ..."
    :sources="sources"
    :allowPaste="{delimiter: ','}"
    :allowDuplicates="false"
    :maxTags="20"
    :defaultTags="['United Kingdom', 'Uruguay', 'Uzbekistan']"
  />
</template>

<script>
import { SmartTagz } from "smart-tagz";
import "smart-tagz/dist/smart-tagz.css";

import { defineComponent } from "vue";

export default defineComponent({
  name: "Basic",
  components: {
    SmartTagz,
  }
});
</script>
```

![demo](demo.gif)

## Props

| Prop             | Type                  | Description                                                                                      | Default          |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------------------ | ---------------- |
| defaultTags      | Array                 | can be initialized with a `default` set of tags                                                  | []               |
| width            | String                | `width` of the container                                                                         | 100%             |
| autosuggest      | Boolean               | Enables the `autosuggest` feature. you also need to set the sources for the autosuggest to work. | false            |
| sources          | Array                 | Works as the `datasource` for the autosuggest feature                                            | []               |
| allowPaste       | { delimiter: String } | Parses the pasted string based on the passed delimiter string and creates tags automatically     | {delimiter: ","} |
| editable         | Boolean               | makes the tags `editable`                                                                        | false            |
| allowDuplicates  | Boolean               | allows/disallows `duplicate` tag entries while pasted or entered manually                        | true             |
| maxTags          | Number                | `Maximum` number of tags allowed                                                                 | 10               |
| inputPlaceholder | String                | `Placeholder` for the input box                                                                  | "Enter tag..."   |
| readOnly         | Boolean               | Makes the whole component `readOnly`. ideal for display only purposes.                           | false            |

### Default Tags

We can initialize smart-tagz with some `default` tags. This setting will mostly be used along with the `readonly` prop to create tags for display only purposes.

```sh
<smart-tagz :defaultTags="['United Kingdom', 'Uruguay', 'Uzbekistan']" />
```

### Duplicates

You can decide how to manage `duplicate` tags by either allowing or disallowing them completely. When set to `false` no duplicate values are allowed.

```sh
<smart-tagz :allow-duplicates="false" />
```

### Auto Suggest

Whe set to `true`, the `autosuggest` prop suggests values in a dropdown. You also need to set the `sources` prop for this to work. The `sources` prop can be an Array of strings.

```sh
 <smart-tagz autosuggest :sources="sources" />
```

### Max Tags

The component can also be configured to accept the `Maximum` number of tags that can be created. Once the threshold is reached, the textbox input will be `hidden` from the user.

```sh
<smart-tagz :max-tags="3" />
```

### Paste

The component can parse strings and automatically create tags for you. The default delimiter is `","` but you can change this setting by manually setting the `delimiter` option.

```sh
<smart-tagz :allow-paste="{delimiter: ';'}" />
```

### Editable Tags

The Tags are not `editable` by default, but you can change this setting with the `editable` prop. Simply double click a tag, make the changes and hit enter to save.

```sh
<smart-tagz editable />
```

### Readonly Tags

You can turn the component into `readonly` mode by setting the readonly prop to true.

```sh
<smart-tagz read-only />
```

### Theme

The components color scheme can be customized by passing a custom theme prop.

```sh
  <smart-tagz
    :theme="{
      primary: '#545454',
      background: '#bdbdbd',
      tagTextColor: '#fff',
    }"
  />
```

## Built with

- [Vue.JS](vue) - The Component is written in Vue + [Typescript](typescript).

## Build Setup

``` bash
# install dependencies
yarn install

# start dev
yarn run dev

# package lib
npm run rollup

# run css linting
yarn run lint:css
```

## Contributing

1. Fork it ( [https://github.com/prabhuignoto/smart-tagz/fork](https://github.com/prabhuignoto/smart-tagz/fork) )
2. Create your feature branch (`git checkout -b new-feature`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin new-feature`)
5. Create a new Pull Request

## Notes

- The project uses [vite](vite) instead of @vue/cli. I choose vite for speed and i also believe [vite](vite) will be the future.

## Meta

Prabhu Murthy – [@prabhumurthy2](https://twitter.com/prabhumurthy2) – prabhu.m.murthy@gmail.com

Distributed under the MIT license. See `LICENSE` for more information.

[https://github.com/prabhuingoto/](https://github.com/prabhuingoto/)

<!-- Markdown link & img dfn's -->

[vue]: https://vuejs.org
[typescript]: https://typescriptlang.org
[vite]: https://github.com/vitejs/vite