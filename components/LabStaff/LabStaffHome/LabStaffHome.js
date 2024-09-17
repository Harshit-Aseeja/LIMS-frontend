import React from "react";
import { useRouter } from "next/router";

function LabStaffHome() {
  const router = useRouter();
  const lab_id = JSON.parse(localStorage.getItem("details")).lab_id;
  router.replace(`/labs/${lab_id}`);
}

export default LabStaffHome;
