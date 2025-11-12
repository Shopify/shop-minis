import { useState } from "react";
import {
  useNavigateWithTransition,
  Card,
  Input,
  Label,
  Touchable,
} from "@shopify/shop-minis-react";

export function InputLabelTest() {
  const navigate = useNavigateWithTransition();
  const [textInput, setTextInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showFormPassword, setShowFormPassword] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center px-4 py-3">
          <Touchable
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 -ml-2 rounded-lg"
            style={{ minHeight: "48px", minWidth: "48px" }}
          >
            <span className="text-xl">←</span>
          </Touchable>
          <div className="flex-1 ml-2">
            <h1 className="text-lg font-bold text-gray-900">Input & Label</h1>
            <p className="text-xs text-gray-600">Form input components</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {/* Basic Input Types */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Input Types
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="text-input">Text Input</Label>
              <Input
                id="text-input"
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter text..."
                className="mt-1"
              />
              {textInput && (
                <p className="text-xs text-gray-600 mt-1">
                  Current value: {textInput}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email-input">Email Input</Label>
              <Input
                id="email-input"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="your@email.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password-input">Password Input</Label>
              <div className="relative mt-1 flex items-center">
                <Input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password..."
                  className="pr-16"
                />
                <Touchable
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 flex items-center px-2 py-1 text-xs font-medium text-blue-600"
                  style={{ minHeight: "36px" }}
                >
                  {showPassword ? "Hide" : "Show"}
                </Touchable>
              </div>
            </div>

            <div>
              <Label htmlFor="number-input">Number Input</Label>
              <Input
                id="number-input"
                type="number"
                placeholder="Enter number..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="search-input">Search Input</Label>
              <Input
                id="search-input"
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="tel-input">Telephone Input</Label>
              <Input
                id="tel-input"
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="url-input">URL Input</Label>
              <Input
                id="url-input"
                type="url"
                placeholder="https://example.com"
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Input States */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Input States
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="default-input">Default State</Label>
              <Input
                id="default-input"
                placeholder="Default input..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="disabled-input">Disabled State</Label>
              <Input
                id="disabled-input"
                value="This input is disabled"
                disabled
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="readonly-input">Read-only State</Label>
              <Input
                id="readonly-input"
                value="This input is read-only"
                readOnly
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="required-input">
                Required Input<span className="text-red-500">*</span>
              </Label>
              <Input
                id="required-input"
                placeholder="This field is required"
                required
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Label Variations */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Label Variations
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="label-1">Standard Label</Label>
              <Input id="label-1" placeholder="Input field..." className="mt-1" />
            </div>

            <div>
              <Label htmlFor="label-2" className="font-bold">
                Bold Label
              </Label>
              <Input id="label-2" placeholder="Input field..." className="mt-1" />
            </div>

            <div>
              <Label htmlFor="label-4" className="flex items-center justify-between">
                <span>Label with Info</span>
                <span className="text-xs text-gray-500 font-normal">Optional</span>
              </Label>
              <Input id="label-4" placeholder="Input field..." className="mt-1" />
            </div>
          </div>
        </Card>

        {/* Form Example */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Form Example
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="form-name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="form-name"
                placeholder="John Doe"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="form-email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="form-email"
                type="email"
                placeholder="john@example.com"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="form-password">
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1 flex items-center">
                <Input
                  id="form-password"
                  type={showFormPassword ? "text" : "password"}
                  placeholder="Enter secure password..."
                  required
                  className="pr-16"
                />
                <Touchable
                  onClick={() => setShowFormPassword(!showFormPassword)}
                  className="absolute right-2 flex items-center px-2 py-1 text-xs font-medium text-blue-600"
                  style={{ minHeight: "36px" }}
                >
                  {showFormPassword ? "Hide" : "Show"}
                </Touchable>
              </div>
            </div>

            <div>
              <Label htmlFor="form-phone">Phone Number</Label>
              <Input
                id="form-phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="form-message">
                Message
                <span className="block text-xs text-gray-500 font-normal mt-0.5">
                  Maximum 500 characters
                </span>
              </Label>
              <Input
                id="form-message"
                placeholder="Your message..."
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Usage Example */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900">Usage Example</h3>
          <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
            {`import { Input, Label, Touchable } from '@shopify/shop-minis-react'

function MyForm() {
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">
          Email Address
          <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative mt-1 flex items-center">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password..."
            className="pr-16"
          />
          <Touchable
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 flex items-center px-2 py-1 text-xs font-medium text-blue-600"
          >
            {showPassword ? "Hide" : "Show"}
          </Touchable>
        </div>
      </div>
    </div>
  )
}`}
          </pre>
        </Card>
      </div>
    </div>
  );
}
