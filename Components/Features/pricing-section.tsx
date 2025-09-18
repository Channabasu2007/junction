import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";

export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "₹0",
      period: "Forever",
      description: "Perfect for getting started with your social presence",
      icon: <Zap className="w-6 h-6" />,
      features: [
        "Custom domain included",
        "Up to 5 social links",
        "Basic analytics",
        "One-tap email contact",
        "Standard templates",
        "Community support",
        "Razorpay payment integration",
        "Feedback system with protection",
        "30% commission on every payment",
        "Max 1000 views per month",
      ],
      buttonText: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "₹299",
      period: "per month",
      description: "Advanced features for content creators and businesses",
      icon: <Star className="w-6 h-6" />,
      features: [
        "Everything in Starter",
        "Advanced payment features",
        "Unlimited social links",
        "Advanced analytics & tracking",
        "PEXELS image integration",
        "Video embedding",
        "Custom styling options",
        "Feedback system with protection",
        "Priority support",
        "Email address of the payer"
      ],
      buttonText: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Pro — 6 Month Deal",
      price: "₹999",
      period: "for 6 months",
      description: "Get 6 months of Pro at nearly 45% OFF (₹1800 → ₹999)",
      icon: <Crown className="w-6 h-6" />,
      features: [
        "Everything in Pro plan",
        "Highest savings as compared to monthly",
        "No automatic renewal",
        "Cancel anytime",
        "10 extra days for renewal",
        "Priority support",
      ],
      buttonText: "Unlock Deal",
      popular: false,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. All plans include secure Razorpay payment processing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.name.includes("6 Month") ? "ring-2 ring-purple-500 scale-105" :
                plan.popular ? "ring-2 ring-orange-500 scale-105" : ""
              } hover:shadow-xl transition-all duration-300`}
            >
              {(plan.popular || plan.name.includes("6 Month")) && (
                <Badge className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${
                  plan.name.includes("6 Month") ? "bg-purple-600" : "bg-orange-500"
                }`}>
                  {plan.name.includes("6 Month") ? "Best Value" : "Most Popular"}
                </Badge>
              )}

              <CardHeader className="text-center pb-8">
                <div
                  className={`inline-flex p-3 rounded-full mb-4 ${
                    plan.name.includes("6 Month") ? "bg-purple-100 text-purple-600 dark:bg-zinc-800 dark:text-purple-400" :
                    plan.popular ? "bg-orange-500 text-white" :
                    "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.name.includes("6 Month") ? "bg-purple-600 hover:bg-purple-700 text-white" :
                    plan.popular ? "bg-orange-500 hover:bg-orange-600" : ""
                  }`}
                  variant={plan.popular || plan.name.includes("6 Month") ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            All plans include secure payment processing with Razorpay
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-sm">SSL Secured</div>
            <div className="text-sm">99.9% Uptime</div>
            <div className="text-sm">24/7 Support</div>
            <div className="text-sm">Money Back Guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
}
