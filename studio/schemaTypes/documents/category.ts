import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "previewKey",
      title: "Preview art key",
      description: "Controls card preview colors on the storefront.",
      type: "string",
      options: {
        list: [
          { title: "Templates", value: "templates" },
          { title: "Shaders", value: "shaders" },
          { title: "Components", value: "components" },
          { title: "Prompts", value: "prompts" },
          { title: "Skills", value: "skills" },
          { title: "Images", value: "images" },
          { title: "Gradients", value: "gradients" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
