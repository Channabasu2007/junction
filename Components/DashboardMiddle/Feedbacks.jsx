"use client";
import React, { useEffect, useState, useCallback } from "react";
import { showSuccess, showError, showInfo } from "@/helpers/ToastManager";
import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/Components/ui/alert-dialog";
import { reloadPreview } from "@/Components/DesignedPages/MobilePreview"

const Feedbacks = ({ user }) => {
  const email = user.email
  const [premium] = useState(user?.isPremium);
  const [enhancedFeedbacks, setEnhancedFeedbacks] = useState(
    user?.FeedbacksCredentials?.enhancedFeedbacks ?? premium
  );
  const [allowFeedbacks, setAllowFeedbacks] = useState(
    user?.FeedbacksCredentials?.allowFeedbacks ?? false
  );
  const [recieveEmails, setRecieveEmails] = useState(
    user?.FeedbacksCredentials?.recieveEmails ?? premium
  );
  const [longMessages, setLongMessages] = useState(
    user?.FeedbacksCredentials?.longMessages ?? premium
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [firstRun, setFirstRun] = useState(true)

  const feedbackFeatures = [
    {
      name: "Enhanced Feedbacks",
      subtitle: "Ensure feedback is free from abusive or offensive language.",
      value: enhancedFeedbacks,
      setValue: setEnhancedFeedbacks,
      description:
        "Enhanced Feedbacks provide protection by filtering inappropriate language in messages and feedback submitted by visitors. When enabled, the system monitors input in real-time, notifying the visitor and preventing submission if abusive words are detected. This helps maintain a respectful communication environment.",
      disclaimer:
        "This feature is currently in development, so occasional offensive words may still appear. We do our best to prevent this, but we are not responsible for any messages you receive. Messages are sent by anonymous visitors whose personal information is not stored in our database."
    },
    {
      name: "Ask for Email",
      subtitle: "Request the visitor’s email address as an optional field.",
      value: recieveEmails,
      setValue: setRecieveEmails,
      description:
        "Ask for Email allows you to optionally collect the visitor’s email address along with their message or feedback. This is useful if you wish to follow up, build connections, or gather insights from engaged visitors. Feedback with valid email addresses is often more actionable and trustworthy.",
      disclaimer:
        "The email provided may not always be genuine, as it depends on what the visitor chooses to share. While we use validation to check the email format, we do not verify its authenticity."
    },
    {
      name: "Long Messages",
      subtitle: "Allow visitors to submit detailed feedback with over 60 words.",
      value: longMessages,
      setValue: setLongMessages,
      description:
        "Long Messages let visitors submit more extensive feedback without a word limit. This feature is beneficial if your audience tends to provide detailed insights, stories, or suggestions. If your audience typically sends short feedback, you may not need to enable it.",
      disclaimer:
        "No major disclaimers here — enabling this feature simply allows visitors to share more in-depth and comprehensive feedback."
    }
  ];


  useEffect(() => {
    if (firstRun) {
      setFirstRun(false)
      return
    }
    const feedBackData = {
      "allowFeedbacks": allowFeedbacks,
      "recieveEmails": recieveEmails,
      "longMessages": longMessages,
      "enhancedFeedbacks": enhancedFeedbacks
    }
    debouncedSave(feedBackData)
  }, [allowFeedbacks, recieveEmails, longMessages, enhancedFeedbacks])

  const saveData = async (data) => {
    console.log(data, email)
    const res = await fetch('/api/DashboardDataChange/FeedbacksInfo', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data, email })
    })
    if (!res.ok) {
      showError("Network error, please turn on the internet")
    }
    const returned = await res.json()
    reloadPreview()
  }
  const handleCheckedChange = (checked) => {
    if (checked) {
      setConfirmOpen(true);
    } else {
      setAllowFeedbacks(false);
      showSuccess("Feedbacks are turned off.");
    }
  };

  const confirmEnableFeedbacks = () => {
    setAllowFeedbacks(true);
    setConfirmOpen(false);
    showSuccess("Feedbacks are turned on.");
  };

  const handleFeatureCheckedChange = (setValue, checked, feature) => {
    if (!user.isPremium) {
      showError("Upgrade to premium and enjoy full access to this feature.")
      return;
    }
    setValue(!!checked);
    showSuccess(` ${feature} feature ${checked ? "enabled" : "disabled"}.`);
  };

  const debouncedSave = useCallback(
    debounce(saveData, 1000),
    [] // The empty dependency array ensures this function is only created once
  );

  function debounce(func, delay) {
    let timeoutId; // This variable will hold the ID of the setTimeout

    return function (...args) {
      // Clear any existing timeout to reset the timer
      clearTimeout(timeoutId);

      // Set a new timeout
      timeoutId = setTimeout(() => {
        // Execute the original function with the correct 'this' context and arguments
        func.apply(this, args);
      }, delay);
    };
  }

  return (
    <div className="w-[90%] mx-auto py-6 mt-2 space-y-8 text-zinc-800 dark:text-zinc-100">
      <h1 className="text-3xl font-semibold text-orange-600">Feedbacks</h1>

      {/* Main feedback toggle */}
      <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <Checkbox checked={allowFeedbacks} onCheckedChange={handleCheckedChange} />
        <Label className="text-lg font-medium">
          Allow website visitors to submit public feedback
        </Label>
      </div>

      {/* Feature list */}

      {allowFeedbacks && feedbackFeatures.map((feature, index) => (
        <div
          key={index}
          className="p-5 mb-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        >
          <div className="flex gap-5 items-center">
            <Checkbox
              checked={feature.value}
              onCheckedChange={(checked) => handleFeatureCheckedChange(feature.setValue, checked, feature.name)}
            />
            <div>
              <h2 className="text-xl font-semibold text-orange-600">{feature.name}</h2>
              <p className="text-sm text-zinc-500 mb-3">{feature.subtitle}</p>
            </div>
          </div>
          <p className="text-base text-zinc-800 dark:text-zinc-100 leading-relaxed">
            {feature.description}
          </p>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 italic bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg">
            {feature.disclaimer}
          </p>
        </div>
      ))}

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enable public feedback?</AlertDialogTitle>
            <AlertDialogDescription>
              Allow visitors to submit public feedback on your profile. We are not responsible
              for inappropriate submissions. You may disable this at any time, or upgrade to
              Premium for enhanced filtering.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmEnableFeedbacks}>Enable</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Feedbacks;
