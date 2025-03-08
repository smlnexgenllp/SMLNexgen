import React, { Suspense } from "react";
import ApplicationForm from "./ApplicationForm";

export default function ApplyFormPage() {
  return (
    <Suspense fallback={<div>Loading application form...</div>}>
      <ApplicationForm />
    </Suspense>
  );
}
