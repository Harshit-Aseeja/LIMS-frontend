import HODLab from "components/HOD/HODLab/HODLab";
import axios from "axios";
import { useEffect, useContext } from "react";
import AuthContext from "store/authContext";
import Error from "components/ErrorPage/Error";
import GuestLab from "components/Guest/GuestLab/GuestLab";
import LabStaffLab from "components/LabStaff/LabStaffLab/LabStaffLab";
import StudentLab from "components/Student/StudentLab/StudentLab";

const Lab = (props) => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.type);

  return authCtx.type === "hod" ? (
    <HODLab inventory={props.inventory} incharge={props.incharge} />
  ) : authCtx.type === "student" ? (
    <StudentLab inventory={props.inventory} incharge={props.incharge} />
  ) : authCtx.type === "guest" ? (
    <GuestLab inventory={props.inventory} incharge={props.incharge} />
  ) : authCtx.type === "labstaff" ? (
    <LabStaffLab inventory={props.inventory} incharge={props.incharge} />
  ) : (
    <Error />
  );
};

export default Lab;

export const getStaticPaths = async () => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/api/labs"
    );

    if (!data || !Array.isArray(data.labIds)) {
      console.error("Invalid data received from the API");
      throw new Error("Invalid data received from the API");
    }

    const labs = data.labIds;

    return {
      fallback: true,
      paths: labs.map((lab) => ({
        params: {
          lab_id: lab.id.toString(),
        },
      })),
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      fallback: true,
      paths: [],
    };
  }
};

export const getStaticProps = async (context) => {
  const { lab_id } = context.params;

  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + `/inventory/${lab_id}`
    );

    if (!data || data.status === 400) {
      return {
        props: {
          inventory: [],
          incharge: [],
        },
        revalidate: 60,
      };
    }

    return {
      props: {
        inventory: data.inventory,
        incharge: data.incharge,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        inventory: [],
        incharge: [],
      },
      revalidate: 60,
    };
  }
};
