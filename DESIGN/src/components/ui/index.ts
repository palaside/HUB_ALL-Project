/**
 * UI Components - Public API
 * Export all UI components for the design system
 */

// ============================================
// Form & Input Components
// ============================================
export { Button, buttonVariants, type ButtonProps } from './Button';
export { Input, inputVariants, type InputProps } from './Input';
export { Textarea, textareaVariants, type TextareaProps } from './Textarea';
export { Checkbox, checkboxVariants, type CheckboxProps } from './Checkbox';
export { RadioGroup, RadioGroupItem, radioVariants, type RadioGroupProps, type RadioGroupItemProps } from './RadioGroup';
export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  selectTriggerVariants,
  type SelectProps,
  type SelectTriggerProps,
  type SelectContentProps,
  type SelectItemProps,
} from './Select';
export { Switch, switchVariants, switchThumbVariants, type SwitchProps } from './Switch';
export { Slider, sliderTrackVariants, sliderRangeVariants, sliderThumbVariants, type SliderProps } from './Slider';

// ============================================
// Layout & Navigation Components
// ============================================
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
} from './Tabs';
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
} from './Accordion';
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  type BreadcrumbProps,
  type BreadcrumbListProps,
  type BreadcrumbItemProps,
  type BreadcrumbLinkProps,
  type BreadcrumbPageProps,
  type BreadcrumbSeparatorProps,
  type BreadcrumbEllipsisProps,
} from './Breadcrumb';
export { Separator, type SeparatorProps } from './Separator';
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  type TableProps,
  type TableHeaderProps,
  type TableBodyProps,
  type TableFooterProps,
  type TableRowProps,
  type TableHeadProps,
  type TableCellProps,
  type TableCaptionProps,
} from './Table';
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  type PaginationProps,
} from './Pagination';

// ============================================
// Overlays & Dialogs Components
// ============================================
export {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogBody,
  dialogContentVariants,
  type DialogProps,
  type DialogContentProps,
  type DialogHeaderProps,
  type DialogFooterProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
} from './Dialog';
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  type DropdownMenuProps,
  type DropdownMenuTriggerProps,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuCheckboxItemProps,
  type DropdownMenuRadioGroupProps,
  type DropdownMenuRadioItemProps,
  type DropdownMenuLabelProps,
  type DropdownMenuSeparatorProps,
  type DropdownMenuShortcutProps,
} from './DropdownMenu';
export { Tooltip, tooltipVariants, type TooltipProps } from './Tooltip';

// ============================================
// Feedback & Status Components
// ============================================
export { Alert, alertVariants, type AlertProps } from './Alert';
export { ToastProvider, useToast, toastVariants, type ToastData } from './Toast';
export { Badge, badgeVariants, type BadgeProps } from './Badge';
export { Spinner, type SpinnerProps } from './Spinner';
export {
  Progress,
  progressVariants,
  progressBarVariants,
  type ProgressProps,
} from './Progress';
export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonCard,
  type SkeletonProps,
} from './Skeleton';
export { EmptyState, type EmptyStateProps } from './EmptyState';

// ============================================
// Display & Media Components
// ============================================
export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  cardVariants,
  type CardProps,
  type CardHeaderProps,
  type CardContentProps,
  type CardFooterProps,
} from './Card';
export {
  Avatar,
  AvatarGroup,
  avatarVariants,
  type AvatarProps,
  type AvatarGroupProps,
} from './Avatar';
export { Kbd, kbdVariants, type KbdProps } from './Kbd';

// ============================================
// Misc Components
// ============================================
export { Toggle, toggleVariants, type ToggleProps } from './Toggle';
export {
  ToggleGroup,
  ToggleGroupItem,
  toggleGroupVariants,
  toggleGroupItemVariants,
  type ToggleGroupProps,
  type ToggleGroupItemProps,
} from './ToggleGroup';

// ============================================
// Style System
// ============================================
export {
  StyleProvider,
  StyleSwitcher,
  StylePreview,
  useStyle,
} from './StyleSwitcher';
export { StyleCustomizer } from './StyleCustomizer';
export { LayoutGallery } from './LayoutGallery';
export { MotionGallery } from './MotionGallery';
export { DashboardGallery } from './DashboardGallery';
