import * as React from "react";
import * as SectionComponents from "./sections";

interface SectionType {
  _type: string | number;
  _key: string;
  section: any;
}

interface PropTypes {
  sections: SectionType[];
}

const resolveSections = (section: SectionType) => {
  let upper = section._type;
  if (typeof upper === "string" && upper.length > 0) {
    upper = upper[0].toUpperCase() + upper.slice(1);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const Section = SectionComponents[upper];

  if (Section) {
    return Section;
  }

  console.error("Cant find section", section); // eslint-disable-line no-console
  return null;
};

const RenderSections = ({ sections }: PropTypes) => {
  if (!sections) {
    console.error("Missing section");
    return <div>Missing sections</div>;
  }

  return (
    <>
      {sections.map((section) => {
        const SectionComponent = resolveSections(section);

        if (!SectionComponent) {
          return <div>Missing section {section._type}</div>;
        }

        return <SectionComponent {...section} key={section._key} />;
      })}
    </>
  );
};

export default RenderSections;
