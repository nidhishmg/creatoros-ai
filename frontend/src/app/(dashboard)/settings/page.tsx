'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Link,
  CreditCard,
  HelpCircle,
  ChevronRight,
  Moon,
  Sun,
  Check,
  ExternalLink,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  Button,
  Badge,
  Input,
} from '@/components/ui';

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'integrations', label: 'Integrations', icon: Link },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'privacy', label: 'Privacy & Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
];

const integrations = [
  { name: 'YouTube', connected: true, icon: '🎬' },
  { name: 'Twitter / X', connected: true, icon: '🐦' },
  { name: 'Instagram', connected: false, icon: '📸' },
  { name: 'TikTok', connected: false, icon: '🎵' },
  { name: 'Spotify', connected: false, icon: '🎧' },
  { name: 'Patreon', connected: true, icon: '💰' },
];

const notificationSettings = [
  { id: 'ai-insights', label: 'AI Insights & Recommendations', enabled: true },
  { id: 'content-performance', label: 'Content Performance Alerts', enabled: true },
  { id: 'ip-violations', label: 'IP Violation Alerts', enabled: true },
  { id: 'brand-deals', label: 'Brand Deal Opportunities', enabled: true },
  { id: 'weekly-digest', label: 'Weekly Digest Email', enabled: false },
  { id: 'marketing', label: 'Product Updates & Tips', enabled: false },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [notifications, setNotifications] = useState(notificationSettings);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Settings</h1>
        <p className="text-surface-500 mt-1">
          Manage your account, integrations, and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card>
            <div className="p-2">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-accent-primary/10 text-accent-primary'
                      : 'text-surface-600 hover:bg-surface-100'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3"
        >
          {/* Profile Section */}
          {activeSection === 'profile' && (
            <Card>
              <CardHeader title="Profile Settings" />
              <div className="p-6 pt-0 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                    C
                  </div>
                  <div>
                    <Button variant="secondary" size="sm">
                      Change Avatar
                    </Button>
                    <p className="text-xs text-surface-500 mt-2">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Creator Name"
                    defaultValue="TechCreator"
                    placeholder="Your channel/brand name"
                  />
                  <Input
                    label="Email"
                    type="email"
                    defaultValue="creator@example.com"
                  />
                  <Input
                    label="Display Name"
                    defaultValue="Tech Creator"
                    placeholder="How others see you"
                  />
                  <Input
                    label="Website"
                    type="url"
                    defaultValue="https://techcreator.com"
                    placeholder="Your website URL"
                  />
                </div>

                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </Card>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <Card>
              <CardHeader title="Notification Preferences" />
              <div className="p-6 pt-0 space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center justify-between p-4 bg-surface-50 rounded-lg"
                  >
                    <span className="font-medium text-surface-900">
                      {notification.label}
                    </span>
                    <button
                      onClick={() => toggleNotification(notification.id)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notification.enabled
                          ? 'bg-accent-primary'
                          : 'bg-surface-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notification.enabled ? 'left-7' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Integrations Section */}
          {activeSection === 'integrations' && (
            <Card>
              <CardHeader title="Connected Platforms" />
              <div className="p-6 pt-0 space-y-3">
                {integrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center justify-between p-4 bg-surface-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <span className="font-medium text-surface-900">
                        {integration.name}
                      </span>
                    </div>
                    {integration.connected ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="success" size="sm">
                          <Check className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Disconnect
                        </Button>
                      </div>
                    ) : (
                      <Button variant="secondary" size="sm">
                        Connect
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Appearance Section */}
          {activeSection === 'appearance' && (
            <Card>
              <CardHeader title="Appearance" />
              <div className="p-6 pt-0 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-3">
                    Theme
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'light', label: 'Light', icon: Sun },
                      { id: 'dark', label: 'Dark', icon: Moon },
                      { id: 'system', label: 'System', icon: Settings },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setTheme(option.id as typeof theme)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                          theme === option.id
                            ? 'border-accent-primary bg-accent-primary/5'
                            : 'border-surface-200 hover:border-surface-300'
                        }`}
                      >
                        <option.icon
                          className={`w-6 h-6 ${
                            theme === option.id
                              ? 'text-accent-primary'
                              : 'text-surface-500'
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            theme === option.id
                              ? 'text-accent-primary'
                              : 'text-surface-700'
                          }`}
                        >
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> Dark mode is coming soon! Currently only
                    light theme is available.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Privacy Section */}
          {activeSection === 'privacy' && (
            <Card>
              <CardHeader title="Privacy & Security" />
              <div className="p-6 pt-0 space-y-4">
                <div className="p-4 bg-surface-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-surface-900">
                      Two-Factor Authentication
                    </span>
                    <Badge variant="success" size="sm">
                      Enabled
                    </Badge>
                  </div>
                  <p className="text-sm text-surface-500">
                    Your account is protected with 2FA.
                  </p>
                </div>

                <div className="p-4 bg-surface-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-surface-900">
                      Data Export
                    </span>
                    <Button variant="secondary" size="sm">
                      Export Data
                    </Button>
                  </div>
                  <p className="text-sm text-surface-500">
                    Download all your data in a portable format.
                  </p>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-red-900">
                      Delete Account
                    </span>
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
                  </div>
                  <p className="text-sm text-red-700">
                    Permanently delete your account and all associated data.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Billing Section */}
          {activeSection === 'billing' && (
            <Card>
              <CardHeader title="Billing & Subscription" />
              <div className="p-6 pt-0 space-y-6">
                <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-surface-900">Pro Plan</h3>
                      <p className="text-sm text-surface-500">
                        $29/month • Renews Dec 15, 2024
                      </p>
                    </div>
                    <Badge variant="ai" size="sm">
                      Active
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="secondary" size="sm">
                      Change Plan
                    </Button>
                    <Button variant="ghost" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-surface-900 mb-3">
                    Payment Method
                  </h4>
                  <div className="flex items-center justify-between p-4 bg-surface-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <span className="text-surface-700">•••• •••• •••• 4242</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Help Section */}
          {activeSection === 'help' && (
            <Card>
              <CardHeader title="Help & Support" />
              <div className="p-6 pt-0 space-y-4">
                <a
                  href="#"
                  className="flex items-center justify-between p-4 bg-surface-50 rounded-lg hover:bg-surface-100 transition-colors"
                >
                  <span className="font-medium text-surface-900">
                    Documentation
                  </span>
                  <ExternalLink className="w-4 h-4 text-surface-400" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between p-4 bg-surface-50 rounded-lg hover:bg-surface-100 transition-colors"
                >
                  <span className="font-medium text-surface-900">
                    Video Tutorials
                  </span>
                  <ExternalLink className="w-4 h-4 text-surface-400" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between p-4 bg-surface-50 rounded-lg hover:bg-surface-100 transition-colors"
                >
                  <span className="font-medium text-surface-900">
                    Contact Support
                  </span>
                  <ExternalLink className="w-4 h-4 text-surface-400" />
                </a>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-800">
                    <strong>Pro Tip:</strong> Use the AI assistant in the right
                    panel for instant help and suggestions!
                  </p>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
