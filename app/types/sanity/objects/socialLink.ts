export interface SocialLinkType {
  _id?: string;
  _key?: string;
  title?: string;
  service:
    | "linkedIn"
    | "gitHub"
    | "angelList"
    | "twitter"
    | "instagram"
    | "facebook";
  link: string;
}
