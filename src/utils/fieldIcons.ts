import { Calendar, Phone, User } from "@element-plus/icons-vue"
import { FieldType } from "@lark-base-open/js-sdk"
import textIcon from "@/components/icons/text-icon.vue"
import barCodeIcon from "@/components/icons/barCode-icon.vue"
import multiSelectIcon from "@/components/icons/multiSelect-icon.vue"
import checkBoxIcon from "@/components/icons/checkBox-icon.vue"
import singleSelectIcon from "@/components/icons/singleSelect-icon.vue"
import currencyIcon from "@/components/icons/currency-icon.vue"
import numberIcon from "@/components/icons/number-icon.vue"
import progressIcon from "@/components/icons/progress-icon.vue"
import ratingIcon from "@/components/icons/rating-icon.vue"
import urlIcon from "@/components/icons/url-icon.vue"
import singleLinkIcon from "@/components/icons/singleLink-icon.vue"
import duplexLinkIcon from "@/components/icons/duplexLink-icon.vue"

export const iconList: { [key: number]: any } = {
  [FieldType.DateTime]: Calendar,
  [FieldType.Checkbox]: checkBoxIcon,
  [FieldType.Phone]: Phone,
  [FieldType.Text]: textIcon,
  [FieldType.Barcode]: barCodeIcon,
  [FieldType.MultiSelect]: multiSelectIcon,
  [FieldType.SingleSelect]: singleSelectIcon,
  [FieldType.Currency]: currencyIcon,
  [FieldType.Number]: numberIcon,
  [FieldType.Progress]: progressIcon,
  [FieldType.Rating]: ratingIcon,
  [FieldType.Url]: urlIcon,
  [FieldType.User]: User,
  [FieldType.SingleLink]: singleLinkIcon,
  [FieldType.DuplexLink]: duplexLinkIcon,
}
