import React, { useEffect, useState, useContext } from "react";
import useHttp from "hooks/use-http";
import AuthContext from "store/authContext";
import Navbar from "components/Navbar/Navbar";
import styles from "./LabStaffDashboard.module.css";

const LabStaffDashboard = () => {
  const [issues, setIssues] = useState([]);
  const { data, get, error, loading } = useHttp();
  const authCtx = useContext(AuthContext);
  const lab_id = authCtx?.details?.lab_id; // Faculty ID for the logged-in staff

  useEffect(() => {
    const fetchIssues = async () => {
      await get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/issues/lab/${lab_id}`,
        headers: {
          authorization: authCtx.token,
        },
      });
    };

    if (lab_id) {
      fetchIssues();
    }
  }, [get, authCtx, lab_id]);

  useEffect(() => {
    if (data) {
      setIssues(data.issues || []);
    }
    if (error) {
      alert(error);
    }
  }, [data, error]);

  const updateIssueStatus = async (issueId, status) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/issues/${issueId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: authCtx.token,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the issue status");
      }

      const updatedIssue = issues.map((issue) =>
        issue.id === issueId ? { ...issue, status } : issue
      );
      setIssues(updatedIssue);
    } catch (error) {
      console.error("Error updating issue status:", error);
      alert("Error updating issue status");
    }
  };

  const handleApprove = async (issueId) => {
    try {
      await updateIssueStatus(issueId, "ongoing");
      alert("Issue approved and status updated to ongoing.");
    } catch (error) {
      console.error("Error approving issue:", error);
      alert("Error approving issue");
    }
  };

  const handleDecline = async (issueId) => {
    try {
      const issueResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/issues/${issueId}`,
        {
          headers: {
            authorization: authCtx.token,
          },
        }
      );

      if (!issueResponse.ok) {
        throw new Error("Failed to fetch issue details");
      }

      const issueData = await issueResponse.json();

      // Update issue status to 'rejected'
      await updateIssueStatus(issueId, "rejected");

      // Reduce issued quantities in the inventory
      const updateIssuedQuantities = issueData.items.map((item) =>
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/inventory/${item.inventory_id}/updateIssuedQuantity`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              authorization: authCtx.token,
            },
            body: JSON.stringify({
              issued_qty: -item.quantity,
            }),
          }
        )
      );

      await Promise.all(updateIssuedQuantities);

      alert("Issue declined and inventory updated successfully!");
    } catch (error) {
      console.error("Error declining issue:", error);
      alert("Error declining issue");
    }
  };

  const handleMarkAsCompleted = async (issueId) => {
    try {
      const issueResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/issues/${issueId}`,
        {
          headers: {
            authorization: authCtx.token,
          },
        }
      );

      if (!issueResponse.ok) {
        throw new Error("Failed to fetch issue details");
      }

      const issueData = await issueResponse.json();

      // Update issue status to 'completed'
      await updateIssueStatus(issueId, "completed");

      // Update issued quantities in the inventory
      const updateIssuedQuantities = issueData.items.map((item) =>
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/inventory/${item.inventory_id}/updateIssuedQuantity`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              authorization: authCtx.token,
            },
            body: JSON.stringify({
              issued_qty: item.quantity,
            }),
          }
        )
      );

      await Promise.all(updateIssuedQuantities);

      alert("Issue marked as completed and inventory updated successfully!");
    } catch (error) {
      console.error("Error marking issue as completed:", error);
      alert("Error marking issue as completed");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles["main-content"]}>
        <div className={styles["main-content-heading"]}>
          Lab Staff Dashboard
        </div>
        {loading && <p>Loading...</p>}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Duration</th>
              <th>Items</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.length === 0 ? (
              <tr>
                <td colSpan="6">No issues found for your lab</td>
              </tr>
            ) : (
              issues.map((issue) => (
                <tr key={issue.id}>
                  <td>{issue.student_id}</td>
                  <td>
                    {formatDate(issue.start_date) +
                      "\nto\n" +
                      formatDate(issue.end_date)}
                  </td>
                  <td>
                    <ul>
                      {issue.items.map((item, index) => (
                        <li key={index}>
                          {item.inventory_name}: {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{issue.reason || "N/A"}</td>
                  <td>{issue.status}</td>
                  <td>
                    {issue.status === "pending" && (
                      <>
                        <button onClick={() => handleApprove(issue.id)}>
                          Approve
                        </button>
                        <button onClick={() => handleDecline(issue.id)}>
                          Decline
                        </button>
                      </>
                    )}
                    {issue.status === "ongoing" && (
                      <button onClick={() => handleMarkAsCompleted(issue.id)}>
                        Mark as Completed
                      </button>
                    )}
                    {issue.status !== "pending" &&
                      issue.status !== "ongoing" && (
                        <>
                          <button onClick={() => handleEdit(issue.id)}>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(issue.id)}>
                            Delete
                          </button>
                        </>
                      )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabStaffDashboard;
