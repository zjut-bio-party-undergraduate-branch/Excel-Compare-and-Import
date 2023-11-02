// import { Calendar } from "@element-plus/icons-vue"
import { FieldType } from "@lark-base-open/js-sdk"
// import textIcon from "@/components/icons/text-icon.vue"
// import barCodeIcon from "@/components/icons/barCode-icon.vue"
// import multiSelectIcon from "@/components/icons/multiSelect-icon.vue"
// import checkBoxIcon from "@/components/icons/checkBox-icon.vue"
// import singleSelectIcon from "@/components/icons/singleSelect-icon.vue"
// import currencyIcon from "@/components/icons/currency-icon.vue"
// import numberIcon from "@/components/icons/number-icon.vue"
// import progressIcon from "@/components/icons/progress-icon.vue"
// import ratingIcon from "@/components/icons/rating-icon.vue"
// import urlIcon from "@/components/icons/url-icon.vue"
// import singleLinkIcon from "@/components/icons/singleLink-icon.vue"
// import duplexLinkIcon from "@/components/icons/duplexLink-icon.vue"
// import formulaIcon from "@/components/icons/formula-icon.vue"
// import modifiedTimeIcon from "@/components/icons/modifiedTime-icon.vue"
// import createdTimeIcon from "@/components/icons/createdTime-icon.vue"
// import autoNumberIcon from "@/components/icons/autoNumber-icon.vue"
// import attachmentIcon from "@/components/icons/attachment-icon.vue"
// import locationIcon from "@/components/icons/location-icon.vue"
// import createdUserIcon from "@/components/icons/createdUser-icon.vue"
// import groupChatIcon from "@/components/icons/groupChat-icon.vue"
// import lookupIcon from "@/components/icons/lookup-icon.vue"
// import modifiedUserIcon from "@/components/icons/modifiedUser-icon.vue"

// export const iconList: { [key: number]: any } = {
//   [FieldType.DateTime]: Calendar,
//   [FieldType.Checkbox]: checkBoxIcon,
//   [FieldType.Phone]: Phone,
//   [FieldType.Text]: textIcon,
//   [FieldType.Barcode]: barCodeIcon,
//   [FieldType.MultiSelect]: multiSelectIcon,
//   [FieldType.SingleSelect]: singleSelectIcon,
//   [FieldType.Currency]: currencyIcon,
//   [FieldType.Number]: numberIcon,
//   [FieldType.Progress]: progressIcon,
//   [FieldType.Rating]: ratingIcon,
//   [FieldType.Url]: urlIcon,
//   [FieldType.User]: User,
//   [FieldType.SingleLink]: singleLinkIcon,
//   [FieldType.DuplexLink]: duplexLinkIcon,
//   [FieldType.Formula]: formulaIcon,
//   [FieldType.ModifiedTime]: modifiedTimeIcon,
//   [FieldType.CreatedTime]: createdTimeIcon,
//   [FieldType.AutoNumber]: autoNumberIcon,
//   [FieldType.Attachment]: attachmentIcon,
//   [FieldType.Location]: locationIcon,
//   [FieldType.CreatedUser]: createdUserIcon,
//   [FieldType.GroupChat]: groupChatIcon,
//   [FieldType.Lookup]: lookupIcon,
//   [FieldType.ModifiedUser]: modifiedUserIcon,
// }

export const iconList: Record<number, any> = {
  [FieldType.DateTime]: () => import("@/components/icons/dateTime-icon.vue"),
  [FieldType.Checkbox]: () => import("@/components/icons/checkBox-icon.vue"),
  [FieldType.Phone]: () => import("@/components/icons/phone-icon.vue"),
  [FieldType.Text]: () => import("@/components/icons/text-icon.vue"),
  [FieldType.Barcode]: () => import("@/components/icons/barCode-icon.vue"),
  [FieldType.MultiSelect]: () =>
    import("@/components/icons/multiSelect-icon.vue"),
  [FieldType.SingleSelect]: () =>
    import("@/components/icons/singleSelect-icon.vue"),
  [FieldType.Currency]: () => import("@/components/icons/currency-icon.vue"),
  [FieldType.Number]: () => import("@/components/icons/number-icon.vue"),
  [FieldType.Progress]: () => import("@/components/icons/progress-icon.vue"),
  [FieldType.Rating]: () => import("@/components/icons/rating-icon.vue"),
  [FieldType.Url]: () => import("@/components/icons/url-icon.vue"),
  [FieldType.User]: () => import("@/components/icons/user-icon.vue"),
  [FieldType.SingleLink]: () =>
    import("@/components/icons/singleLink-icon.vue"),
  [FieldType.DuplexLink]: () =>
    import("@/components/icons/duplexLink-icon.vue"),
  [FieldType.Formula]: () => import("@/components/icons/formula-icon.vue"),
  [FieldType.ModifiedTime]: () =>
    import("@/components/icons/modifiedTime-icon.vue"),
  [FieldType.CreatedTime]: () =>
    import("@/components/icons/createdTime-icon.vue"),
  [FieldType.AutoNumber]: () =>
    import("@/components/icons/autoNumber-icon.vue"),
  [FieldType.Attachment]: () =>
    import("@/components/icons/attachment-icon.vue"),
  [FieldType.Location]: () => import("@/components/icons/location-icon.vue"),
  [FieldType.CreatedUser]: () =>
    import("@/components/icons/createdUser-icon.vue"),
  [FieldType.GroupChat]: () => import("@/components/icons/groupChat-icon.vue"),
  [FieldType.Lookup]: () => import("@/components/icons/lookup-icon.vue"),
  [FieldType.ModifiedUser]: () =>
    import("@/components/icons/modifiedUser-icon.vue"),
}
