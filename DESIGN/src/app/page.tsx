'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  // Form & Input
  Button,
  Input,
  Textarea,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  Switch,
  Slider,
  // Layout & Navigation
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Pagination,
  // Overlays
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Tooltip,
  // Feedback
  Alert,
  Badge,
  Spinner,
  Progress,
  Skeleton,
  SkeletonCard,
  EmptyState,
  ToastProvider,
  useToast,
  // Display
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Avatar,
  AvatarGroup,
  Kbd,
  // Misc
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui';
import {
  ArrowRight,
  Download,
  Mail,
  Search,
  Heart,
  Star,
  Bell,
  Settings,
  User,
  Check,
  Plus,
  Trash2,
  Edit,
  Copy,
  ExternalLink,
  MoreVertical,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Home,
  ChevronRight,
  LogOut,
  UserCircle,
  CreditCard,
  HelpCircle,
  Sparkles,
  Zap,
  LayoutDashboard,
} from 'lucide-react';

// Wrapper component for toast functionality
function ToastDemo() {
  const { addToast } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          addToast({
            title: 'Success!',
            description: 'Your action was completed successfully.',
            variant: 'success',
          })
        }
      >
        Success Toast
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          addToast({
            title: 'Error',
            description: 'Something went wrong. Please try again.',
            variant: 'error',
          })
        }
      >
        Error Toast
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          addToast({
            title: 'Info',
            description: 'Here is some useful information.',
            variant: 'info',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo clicked'),
            },
          })
        }
      >
        Info with Action
      </Button>
    </div>
  );
}

export default function DesignSystemShowcase() {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFramework, setSelectedFramework] = useState('');

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">DS</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Design System</h1>
                  <p className="text-xs text-gray-500">Production-Ready Components</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success" dot>v1.0.0</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon">
                      <Bell size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Mail size={14} className="mr-2" />
                      New message received
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Star size={14} className="mr-2" />
                      You have a new review
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Avatar size="sm" fallback="JD" status="online" showStatus />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Title */}
          <div className="mb-12 text-center">
            <Badge variant="primary" className="mb-4">🎨 Design System Template</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Production-Ready UI Components
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ระบบออกแบบครบวงจร พร้อม Design Tokens, Interactive Components,
              และ Clean Architecture ตามมาตรฐาน SOLID Principles
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
              <span>Press</span>
              <Kbd keys={['cmd', 'k']} />
              <span>to search</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <Link href="/styles">
                <Button variant="primary" size="lg" leftIcon={<Star size={18} />}>
                  🎨 Style Gallery
                </Button>
              </Link>
              <Link href="/layouts">
                <Button variant="outline" size="lg" leftIcon={<Sparkles size={18} />}>
                  📐 Layout Gallery
                </Button>
              </Link>
              <Link href="/motions">
                <Button variant="outline" size="lg" leftIcon={<Zap size={18} />}>
                  ✨ Motion Gallery
                </Button>
              </Link>
              <Link href="/dashboards">
                <Button variant="outline" size="lg" leftIcon={<LayoutDashboard size={18} />}>
                  📊 Dashboard Gallery
                </Button>
              </Link>
            </div>
          </div>

          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  <Home size={14} className="mr-1" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Design System</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Tabs for Component Categories */}
          <Tabs defaultValue="form" className="mb-12">
            <TabsList variant="underline" className="mb-6">
              <TabsTrigger value="form" variant="underline">Form & Input</TabsTrigger>
              <TabsTrigger value="layout" variant="underline">Layout & Navigation</TabsTrigger>
              <TabsTrigger value="feedback" variant="underline">Feedback & Status</TabsTrigger>
              <TabsTrigger value="display" variant="underline">Display & Data</TabsTrigger>
            </TabsList>

            {/* Form & Input Tab */}
            <TabsContent value="form">
              <div className="space-y-8">
                {/* Buttons Section */}
                <Card>
                  <CardHeader title="Buttons" subtitle="Interactive button components with multiple variants" />
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Variants</h4>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="danger">Danger</Button>
                        <Button variant="success">Success</Button>
                        <Button variant="warning">Warning</Button>
                        <Button variant="link">Link</Button>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">With Icons</h4>
                      <div className="flex flex-wrap gap-3">
                        <Button leftIcon={<Download size={16} />}>Download</Button>
                        <Button variant="secondary" rightIcon={<ArrowRight size={16} />}>Continue</Button>
                        <Button variant="success" leftIcon={<Check size={16} />}>Confirm</Button>
                        <Button variant="danger" leftIcon={<Trash2 size={16} />}>Delete</Button>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">States</h4>
                      <div className="flex flex-wrap gap-3">
                        <Button disabled>Disabled</Button>
                        <Button loading={loading} onClick={handleLoadingDemo} loadingText="Loading...">
                          {loading ? 'Loading...' : 'Click for Loading'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Inputs Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader title="Text Inputs" />
                    <CardContent className="space-y-4">
                      <Input label="Username" placeholder="Enter your username" helperText="This will be your display name" />
                      <Input label="Email" type="email" placeholder="you@example.com" leftIcon={<Mail size={16} />} />
                      <Input label="Search" placeholder="Search..." leftIcon={<Search size={16} />} />
                      <Input label="With Error" error="This field is required" placeholder="Enter value" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader title="Textarea" />
                    <CardContent className="space-y-4">
                      <Textarea label="Message" placeholder="Type your message..." helperText="Maximum 500 characters" showCount maxLength={500} />
                      <Textarea label="Auto-resize" placeholder="This textarea auto-resizes..." autoResize rows={2} />
                    </CardContent>
                  </Card>
                </div>

                {/* Selection Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader title="Select" />
                    <CardContent>
                      <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                        <SelectTrigger placeholder="Select a framework" />
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Frontend</SelectLabel>
                            <SelectItem value="react">React</SelectItem>
                            <SelectItem value="vue">Vue</SelectItem>
                            <SelectItem value="angular">Angular</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Backend</SelectLabel>
                            <SelectItem value="node">Node.js</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader title="Checkboxes" />
                    <CardContent className="space-y-3">
                      <Checkbox label="Accept terms and conditions" />
                      <Checkbox label="Subscribe to newsletter" defaultChecked />
                      <Checkbox label="Disabled option" disabled />
                      <Checkbox label="Indeterminate" indeterminate />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader title="Radio Group" />
                    <CardContent>
                      <RadioGroup defaultValue="option1">
                        <RadioGroupItem value="option1" label="Option 1" />
                        <RadioGroupItem value="option2" label="Option 2" />
                        <RadioGroupItem value="option3" label="Option 3" disabled />
                      </RadioGroup>
                    </CardContent>
                  </Card>
                </div>

                {/* Switches and Sliders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader title="Switches" />
                    <CardContent className="space-y-4">
                      <Switch label="Enable notifications" description="Receive push notifications" />
                      <Switch label="Dark mode" defaultChecked />
                      <Switch label="Disabled" disabled />
                      <Switch variant="success" label="Active status" defaultChecked />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader title="Slider" />
                    <CardContent className="space-y-6">
                      <Slider value={sliderValue} onValueChange={setSliderValue} showValue />
                      <Slider defaultValue={30} variant="success" />
                      <Slider defaultValue={70} variant="warning" size="lg" />
                    </CardContent>
                  </Card>
                </div>

                {/* Toggle Groups */}
                <Card>
                  <CardHeader title="Toggle & Toggle Group" />
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Toggle aria-label="Toggle bold">
                        <Bold size={16} />
                      </Toggle>
                      <Toggle aria-label="Toggle italic">
                        <Italic size={16} />
                      </Toggle>
                      <Toggle aria-label="Toggle underline" defaultPressed>
                        <Underline size={16} />
                      </Toggle>
                    </div>
                    <Separator />
                    <ToggleGroup type="single" defaultValue="left">
                      <ToggleGroupItem value="left" aria-label="Align left">
                        <AlignLeft size={16} />
                      </ToggleGroupItem>
                      <ToggleGroupItem value="center" aria-label="Align center">
                        <AlignCenter size={16} />
                      </ToggleGroupItem>
                      <ToggleGroupItem value="right" aria-label="Align right">
                        <AlignRight size={16} />
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Layout & Navigation Tab */}
            <TabsContent value="layout">
              <div className="space-y-8">
                {/* Accordion */}
                <Card>
                  <CardHeader title="Accordion" subtitle="Collapsible content panels" />
                  <CardContent>
                    <Accordion type="single" collapsible defaultValue="item-1">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>What is a Design System?</AccordionTrigger>
                        <AccordionContent>
                          A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Why use Design Tokens?</AccordionTrigger>
                        <AccordionContent>
                          Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>How to customize components?</AccordionTrigger>
                        <AccordionContent>
                          All components are built with CSS variables and Tailwind CSS, making them highly customizable through theming and direct class overrides.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                {/* Tabs Demo */}
                <Card>
                  <CardHeader title="Tabs Variants" subtitle="Different tab styles for various use cases" />
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Default Tabs</h4>
                      <Tabs defaultValue="tab1">
                        <TabsList>
                          <TabsTrigger value="tab1">Account</TabsTrigger>
                          <TabsTrigger value="tab2">Password</TabsTrigger>
                          <TabsTrigger value="tab3">Settings</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tab1">Account settings content here.</TabsContent>
                        <TabsContent value="tab2">Password settings content here.</TabsContent>
                        <TabsContent value="tab3">General settings content here.</TabsContent>
                      </Tabs>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Pills Tabs</h4>
                      <Tabs defaultValue="tab1">
                        <TabsList variant="pills">
                          <TabsTrigger value="tab1" variant="pills">Overview</TabsTrigger>
                          <TabsTrigger value="tab2" variant="pills">Analytics</TabsTrigger>
                          <TabsTrigger value="tab3" variant="pills">Reports</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </CardContent>
                </Card>

                {/* Dialog Demo */}
                <Card>
                  <CardHeader title="Dialog / Modal" subtitle="Modal dialog for important interactions" />
                  <CardContent>
                    <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogBody>
                          <div className="space-y-4">
                            <Input label="Name" defaultValue="John Doe" />
                            <Input label="Email" type="email" defaultValue="john@example.com" />
                          </div>
                        </DialogBody>
                        <DialogFooter>
                          <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
                          <Button onClick={() => setDialogOpen(false)}>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                {/* Dropdown Menu */}
                <Card>
                  <CardHeader title="Dropdown Menu" subtitle="Context and action menus" />
                  <CardContent>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="outline" rightIcon={<MoreVertical size={16} />}>
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <UserCircle size={14} className="mr-2" />
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CreditCard size={14} className="mr-2" />
                          Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings size={14} className="mr-2" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem destructive>
                          <LogOut size={14} className="mr-2" />
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardContent>
                </Card>

                {/* Tooltip */}
                <Card>
                  <CardHeader title="Tooltips" subtitle="Contextual information on hover" />
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <Tooltip content="Top tooltip" position="top">
                        <Button variant="outline">Top</Button>
                      </Tooltip>
                      <Tooltip content="Bottom tooltip" position="bottom">
                        <Button variant="outline">Bottom</Button>
                      </Tooltip>
                      <Tooltip content="Left tooltip" position="left">
                        <Button variant="outline">Left</Button>
                      </Tooltip>
                      <Tooltip content="Right tooltip" position="right">
                        <Button variant="outline">Right</Button>
                      </Tooltip>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Feedback & Status Tab */}
            <TabsContent value="feedback">
              <div className="space-y-8">
                {/* Alerts */}
                <Card>
                  <CardHeader title="Alerts" subtitle="System messages and notifications" />
                  <CardContent className="space-y-4">
                    <Alert variant="info" title="Information" dismissible>
                      This is an informational alert with a dismissible option.
                    </Alert>
                    <Alert variant="success" title="Success!">
                      Your changes have been saved successfully.
                    </Alert>
                    <Alert variant="warning" title="Warning">
                      Please review your input before proceeding.
                    </Alert>
                    <Alert variant="danger" title="Error" dismissible>
                      Something went wrong. Please try again.
                    </Alert>
                  </CardContent>
                </Card>

                {/* Toast Demo */}
                <Card>
                  <CardHeader title="Toast Notifications" subtitle="Non-blocking notifications" />
                  <CardContent>
                    <ToastDemo />
                  </CardContent>
                </Card>

                {/* Badges */}
                <Card>
                  <CardHeader title="Badges" subtitle="Status indicators and labels" />
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="primary">Primary</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="success">Success</Badge>
                      <Badge variant="warning">Warning</Badge>
                      <Badge variant="danger">Danger</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="success" dot>Online</Badge>
                      <Badge variant="danger" dot>Offline</Badge>
                      <Badge variant="warning" dot>Away</Badge>
                      <Badge variant="primary" icon={<Star size={12} />}>Featured</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Progress */}
                <Card>
                  <CardHeader title="Progress & Loading" subtitle="Progress indicators and spinners" />
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Progress value={25} showLabel />
                      <Progress value={50} variant="success" />
                      <Progress value={75} variant="warning" striped />
                      <Progress value={90} variant="danger" animated />
                    </div>
                    <Separator />
                    <div className="flex items-center gap-6">
                      <Spinner size={16} />
                      <Spinner size={24} />
                      <Spinner size={32} color="#3b82f6" />
                    </div>
                  </CardContent>
                </Card>

                {/* Skeleton */}
                <Card>
                  <CardHeader title="Skeleton Loading" subtitle="Placeholder content while loading" />
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <SkeletonCard />
                      <div className="space-y-4">
                        <Skeleton height={200} className="rounded-lg" />
                        <Skeleton height={16} width="80%" />
                        <Skeleton height={16} width="60%" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Empty State */}
                <Card>
                  <CardHeader title="Empty States" subtitle="Placeholder for no data scenarios" />
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <EmptyState
                        type="search"
                        size="sm"
                        action={<Button variant="outline" size="sm">Clear Search</Button>}
                      />
                      <EmptyState
                        type="empty"
                        size="sm"
                        action={<Button size="sm" leftIcon={<Plus size={16} />}>Add Item</Button>}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Display & Data Tab */}
            <TabsContent value="display">
              <div className="space-y-8">
                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card variant="default">
                    <CardHeader title="Default Card" subtitle="Standard border style" action={<Badge variant="primary">New</Badge>} />
                    <CardContent>
                      <p className="text-gray-600 text-sm">This is the default card variant.</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm">Cancel</Button>
                      <Button size="sm">Save</Button>
                    </CardFooter>
                  </Card>

                  <Card variant="elevated">
                    <CardHeader title="Elevated Card" subtitle="With shadow effect" />
                    <CardContent>
                      <p className="text-gray-600 text-sm">This card has a prominent shadow.</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" leftIcon={<ExternalLink size={14} />}>View More</Button>
                    </CardFooter>
                  </Card>

                  <Card variant="filled" interactive>
                    <CardHeader title="Interactive Card" subtitle="Click anywhere to interact" action={<ArrowRight size={20} className="text-gray-400" />} />
                    <CardContent>
                      <p className="text-gray-600 text-sm">This card responds to hover and click.</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Avatars */}
                <Card>
                  <CardHeader title="Avatars" subtitle="User profile images and groups" />
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                      <Avatar size="xs" fallback="XS" />
                      <Avatar size="sm" fallback="SM" />
                      <Avatar size="md" fallback="MD" />
                      <Avatar size="lg" fallback="LG" />
                      <Avatar size="xl" fallback="XL" />
                      <Avatar size="2xl" fallback="2X" />
                    </div>
                    <Separator />
                    <div className="flex flex-wrap items-center gap-4">
                      <Avatar fallback="JD" status="online" showStatus />
                      <Avatar fallback="AB" status="offline" showStatus />
                      <Avatar fallback="CD" status="away" showStatus />
                      <Avatar fallback="EF" status="busy" showStatus />
                    </div>
                    <Separator />
                    <AvatarGroup max={4}>
                      <Avatar fallback="JD" />
                      <Avatar fallback="AB" />
                      <Avatar fallback="CD" />
                      <Avatar fallback="EF" />
                      <Avatar fallback="GH" />
                      <Avatar fallback="IJ" />
                    </AvatarGroup>
                  </CardContent>
                </Card>

                {/* Table */}
                <Card>
                  <CardHeader title="Table" subtitle="Data tables with sorting and selection" />
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">John Doe</TableCell>
                          <TableCell><Badge variant="success" dot>Active</Badge></TableCell>
                          <TableCell>Admin</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon-sm"><Edit size={14} /></Button>
                            <Button variant="ghost" size="icon-sm"><Trash2 size={14} /></Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Jane Smith</TableCell>
                          <TableCell><Badge variant="warning" dot>Pending</Badge></TableCell>
                          <TableCell>Editor</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon-sm"><Edit size={14} /></Button>
                            <Button variant="ghost" size="icon-sm"><Trash2 size={14} /></Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Bob Johnson</TableCell>
                          <TableCell><Badge variant="danger" dot>Inactive</Badge></TableCell>
                          <TableCell>Viewer</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon-sm"><Edit size={14} /></Button>
                            <Button variant="ghost" size="icon-sm"><Trash2 size={14} /></Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Pagination */}
                <Card>
                  <CardHeader title="Pagination" subtitle="Navigate through pages of data" />
                  <CardContent>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={10}
                      onPageChange={setCurrentPage}
                    />
                  </CardContent>
                </Card>

                {/* Keyboard */}
                <Card>
                  <CardHeader title="Keyboard Shortcuts" subtitle="Display keyboard shortcuts" />
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <Kbd keys={['cmd', 'c']} /> <span className="text-sm text-gray-600">Copy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Kbd keys={['cmd', 'v']} /> <span className="text-sm text-gray-600">Paste</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Kbd keys={['cmd', 'shift', 'p']} /> <span className="text-sm text-gray-600">Command Palette</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Kbd>Esc</Kbd> <span className="text-sm text-gray-600">Close</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Design Tokens Preview */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">🎨 Design Tokens</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader title="Color Palette - Primary" />
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                      <div key={shade} className="aspect-square rounded-lg flex items-end justify-center pb-1" style={{ backgroundColor: `var(--color-primary-${shade})` }}>
                        <span className={`text-xs font-medium ${shade >= 500 ? 'text-white' : 'text-gray-700'}`}>{shade}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader title="Semantic Colors" />
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="h-12 rounded-lg bg-green-500 flex items-center justify-center text-white font-medium">Success</div>
                    <div className="h-12 rounded-lg bg-amber-500 flex items-center justify-center text-white font-medium">Warning</div>
                    <div className="h-12 rounded-lg bg-red-500 flex items-center justify-center text-white font-medium">Error</div>
                    <div className="h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white font-medium">Info</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Architecture Info */}
          <Card variant="filled" padding="lg">
            <CardHeader title="🏗️ Component Checklist" subtitle="Based on shadcn/ui Collection" />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Form & Input ✅</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Button & Button Group</li>
                    <li>✓ Input & Textarea</li>
                    <li>✓ Select</li>
                    <li>✓ Checkbox & Radio</li>
                    <li>✓ Switch & Slider</li>
                    <li>✓ Toggle & Toggle Group</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Layout & Navigation ✅</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Tabs</li>
                    <li>✓ Accordion</li>
                    <li>✓ Breadcrumb</li>
                    <li>✓ Separator</li>
                    <li>✓ Table</li>
                    <li>✓ Pagination</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Overlays & Feedback ✅</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Dialog / Modal</li>
                    <li>✓ Dropdown Menu</li>
                    <li>✓ Tooltip</li>
                    <li>✓ Alert & Toast</li>
                    <li>✓ Progress & Spinner</li>
                    <li>✓ Skeleton</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Display ✅</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Card</li>
                    <li>✓ Avatar & Avatar Group</li>
                    <li>✓ Badge</li>
                    <li>✓ Empty State</li>
                    <li>✓ Kbd (Keyboard)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-500 text-sm">
              🎨 Design System Template • Production-Ready • Interactive 100%
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Built with Next.js, TypeScript, Tailwind CSS, and CVA
            </p>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
}
