import Label from './components/common/Label';
import AutoComplete from './components/core/AutoComplete';
import Button from './components/core/Button';
import Calendar from './components/core/Calendar';
import Divider from './components/core/Divider';
import Dropdown from './components/core/Dropdown';
import InputNumber from './components/core/InputNumber';
import InputSwitch from './components/core/InputSwitch';
import InputText from './components/core/InputText';
import InputTextArea from './components/core/InputTextArea';
import InternalStyle from './components/core/InternalStyle';
import MultiSelect from './components/core/MultiSelect';
import Paginator from './components/core/Paginator';
import Password from './components/core/Password';
import RadioButton from './components/core/RadioButton';
import Table from './components/core/Table';
import Tag from './components/core/Tag';
import Timeline from './components/core/Timeline';
import TreeSelect from './components/core/TreeSelect';
import File from './components/core/File';
import CascadeSelect from './components/p-core/CascadeSelect';
import Checkbox from './components/p-core/Checkbox';
import Chips from './components/p-core/Chips';
import ColorPicker from './components/p-core/ColorPicker';
import InputOtp from './components/p-core/InputOtp';
import Editor from './components/p-core/Editor';
import Knob from './components/p-core/Knob';
import ListBox from './components/p-core/ListBox';
import Rating from './components/p-core/Rating';
import SelectButton from './components/p-core/SelectButton';
import Slider from './components/p-core/Slider';
import SpeedDial from './components/p-core/SpeedDial';
import Select from './components/p-core/Select';
import OrganizationChart from './components/p-core/OrganizationChart';
import Avatar from './components/p-core/Avatar';
import ProgressBar from './components/p-core/ProgressBar';
import Badge from './components/p-core/Badge';
import Skeleton from './components/p-core/Skeleton';
import PCalendar from './components/p-core/Calendar';
import { addLocale, locale } from 'primereact/api';

addLocale('vi', {
  firstDayOfWeek: 1,
  dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  monthNames: [
    'Tháng Một',
    'Tháng Hai',
    'Tháng Ba',
    'Tháng Tư',
    'Tháng Năm',
    'Tháng Sáu',
    'Tháng Bảy',
    'Tháng Tám',
    'Tháng Chín',
    'Tháng Mười',
    'Tháng Mười Một',
    'Tháng Mười Hai',
  ],
  monthNamesShort: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
  today: 'Hôm nay',
  weekHeader: 'Tuần',
});

locale('vi');

export default {
  pCalendar: PCalendar,
  button: Button,
  timeline: Timeline,
  table: Table,
  tag: Tag,
  dropdown: Dropdown,
  inputtext: InputText,
  inputswitch: InputSwitch,
  inputtextarea: InputTextArea,
  inputnumber: InputNumber,
  multiselect: MultiSelect,
  treeselect: TreeSelect,
  calendar: Calendar,
  autocomplete: AutoComplete,
  divider: Divider,
  password: Password,
  paginator: Paginator,
  radiobutton: RadioButton,
  label: Label,
  internalstyle: InternalStyle,
  file: File,
  cascadeselect: CascadeSelect,
  checkbox: Checkbox,
  chips: Chips,
  colorpicker: ColorPicker,
  inputotp: InputOtp,
  editor: Editor,
  knob: Knob,
  listbox: ListBox,
  rating: Rating,
  selectbutton: SelectButton,
  slider: Slider,
  speeddial: SpeedDial,
  organizationchart: OrganizationChart,
  avatar: Avatar,
  progressbar: ProgressBar,
  badge: Badge,
  skeleton: Skeleton,
  select: Select,
};
