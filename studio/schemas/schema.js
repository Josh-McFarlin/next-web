// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Document types
import author from "./documents/author";
import blog from "./documents/blog";
import category from "./documents/category";
import page from "./documents/page";
import post from "./documents/post";
import route from "./documents/route";
import shop from "./documents/shop";
import siteConfig from "./documents/siteConfig";

// Object types
import cta from "./objects/cta";
import embedHTML from "./objects/embedHTML";
import internalLink from "./objects/internalLink";
import link from "./objects/link";
import portableText from "./objects/portableText";
import job from "./objects/job";
import project from "./objects/project";
import school from "./objects/school";
import skill from "./objects/skill";
import titledLink from "./objects/titledLink";
import sectionHeader from "./objects/sectionHeader";
import figure from "./objects/figure";
import icon from "./objects/icon";
import socialLink from "./objects/socialLink";
import socialLinks from "./objects/socialLinks";
import formField from "./objects/formField";

// Sanity page sections
import hero from "./objects/hero";
import imageSection from "./objects/imageSection";
import textSection from "./objects/textSection";
import projectsSection from "./objects/projectsSection";
import workExperience from "./objects/workExperience";
import education from "./objects/education";
import skillSet from "./objects/skillSet";
import basicImage from "./objects/basicImage";
import form from "./objects/form";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: "default",
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    author,
    blog,
    category,
    page,
    post,
    route,
    shop,
    siteConfig,

    // Object types
    cta,
    embedHTML,
    internalLink,
    link,
    portableText,
    job,
    project,
    school,
    skill,
    titledLink,
    sectionHeader,
    figure,
    icon,
    socialLink,
    socialLinks,
    formField,

    // Sanity page sections
    hero,
    imageSection,
    textSection,
    projectsSection,
    workExperience,
    education,
    skillSet,
    basicImage,
    form,
  ]),
});
