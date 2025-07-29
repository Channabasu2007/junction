"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/Components/ui/tabs"

import {
  BarChart3,
  MousePointer,
  DollarSign,
  Eye,
  Heart,
  Settings,
  Palette,
  Link2,
} from "lucide-react"

export function DashboardPreview() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30 dark:bg-zinc-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful <span className="italic font-bold inline-block text-orange-500">Dashboard</span> at Your Fingertips
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Monitor your performance, track payments, and manage your content with our intuitive dashboard.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl p-8 border dark:border-zinc-700">
          <Tabs defaultValue="analytics"  className="w-full ">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="links" disabled className="flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                Links
              </TabsTrigger>
              <TabsTrigger value="customize" disabled className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Customize
              </TabsTrigger>
              <TabsTrigger value="settings" disabled className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* --- Analytics Tab --- */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Metric Cards */}
                {[
                  {
                    title: "Total Clicks",
                    icon: <MousePointer className="h-4 w-4 text-muted-foreground" />,
                    value: "12,847",
                    change: "+12.5%",
                  },
                  {
                    title: "Page Views",
                    icon: <Eye className="h-4 w-4 text-muted-foreground" />,
                    value: "8,432",
                    change: "+8.2%",
                  },
                  {
                    title: "Revenue",
                    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
                    value: "₹24,680",
                    change: "+15.3%",
                  },
                  {
                    title: "Engagement",
                    icon: <Heart className="h-4 w-4 text-muted-foreground" />,
                    value: "94.2%",
                    change: "+2.1%",
                  },
                ].map((metric, i) => (
                  <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                      {metric.icon}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-600">{metric.change}</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Top Links Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Click Performance</CardTitle>
                  <CardDescription>Your top performing links this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Instagram Profile", clicks: 3420, growth: "+12%" },
                      { name: "YouTube Channel", clicks: 2890, growth: "+8%" },
                      { name: "Portfolio Website", clicks: 2156, growth: "+15%" },
                      { name: "LinkedIn Profile", clicks: 1876, growth: "+5%" },
                    ].map((link, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{link.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {link.clicks} clicks
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-green-600">{link.growth}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* --- Links Tab --- */}
            <TabsContent value="links" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Your Links</CardTitle>
                  <CardDescription>Add, edit, and organize your social media links</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full">Add New Link</Button>
                    <div className="text-center text-gray-600 dark:text-gray-400 mt-6">
                      <Link2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>You have unlimited link permissions</p>
                      <p className="text-sm">Add as many social media links as you want</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* --- Customize Tab --- */}
            <TabsContent value="customize" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customize Your Page</CardTitle>
                  <CardDescription>
                    Choose styles for each component to match your brand
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {["Theme Colors", "Button Styles", "Background", "Typography", "Layout", "Animations"].map(
                      (option) => (
                        <div
                          key={option}
                          className="p-4 border rounded-lg text-center hover:bg-gray-50 dark:hover:bg-zinc-700 cursor-pointer"
                        >
                          <Palette className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                          <div className="font-medium">{option}</div>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* --- Settings Tab --- */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Custom Domain",
                        value: "yourname.com",
                        badge: "Active",
                      },
                      {
                        title: "Payment Gateway",
                        value: "Razorpay Integration",
                        badge: "Connected",
                      },
                    ].map((setting, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{setting.title}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{setting.value}</div>
                        </div>
                        <Badge variant="secondary">{setting.badge}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
