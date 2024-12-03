import { PageLinkPLatform } from "~/types/enums";

export const PAGE_LINKS = {
  [PageLinkPLatform.X]: {
    name: "X",
    colorClassname: "",
    icon: "i-tabler-brand-x",
    inputLabel: "Twitter Username",
  },
  [PageLinkPLatform.WEBSITE]: {
    name: "Website",
    colorClassname: "",
    icon: "i-tabler-link",
    inputLabel: "Website link",
  },
  [PageLinkPLatform.YOUTUBE]: {
    name: "Youtube",
    colorClassname: "text-[#FF0000]",
    icon: "i-tabler-brand-youtube",
    inputLabel: "Youtube channel",
  },
  [PageLinkPLatform.RUMBLE]: {
    name: "Rumble",
    colorClassname: "text-[#85c742]",
    icon: "i-tabler-brand-rumble",
    inputLabel: "Rumble username",
  },
  [PageLinkPLatform.TWITCH]: {
    name: "Twitch",
    colorClassname: "text-[#6441a5]",
    icon: "i-tabler-brand-twitch",
    inputLabel: "Twitch username",
  },
  [PageLinkPLatform.SUBSTACK]: {
    name: "Substack",
    colorClassname: "text-[#FF6719]",
    icon: "i-simple-icons-substack",
    inputLabel: "Substack link",
  },
};
