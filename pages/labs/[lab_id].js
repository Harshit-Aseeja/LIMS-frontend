import HODLab from "components/HOD/HODLab/HODLab";
import axios from "axios";
import { useEffect, useContext } from "react";
import AuthContext from "store/authContext";
import Error from "components/ErrorPage/Error";
import GuestLab from "components/Guest/GuestLab/GuestLab";
import LabStaffLab from "components/LabStaff/LabStaffLab/LabStaffLab";
const Lab = (props) => {
  // if (!props.incharge || props.incharge.length === 0) {
  //   return <Error />;
  // }
  const authCtx = useContext(AuthContext);
  useEffect(() => {}, []);
  return authCtx.type === "hod" ? (
    <HODLab inventory={props.inventory} incharge={props.incharge} />
  ) : authCtx.type === "guest" ? (
    <GuestLab inventory={props.inventory} incharge={props.incharge} />
  ) : authCtx.type === "labstaff" ? (
    <LabStaffLab inventory={props.inventory} incharge={props.incharge} />
  ) : (
    <Error />
  );
};

export default Lab;

// this function is called at build time on server side to get the paths for the page component (Lab)
// It fetches the lab ids from the backend and returns the paths for the page component (Lab)
export const getStaticPaths = async () => {
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/api/labs"
  );
  const labs = data.labIds;
  return {
    fallback: true,
    paths: labs.map((lab) => ({
      params: {
        lab_id: lab.id.toString(),
      },
    })),
  };
};

// this function is called at build time on server side to get the props for the page component (Lab)
export const getStaticProps = async (context) => {
  const { lab_id } = context.params;
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
};
