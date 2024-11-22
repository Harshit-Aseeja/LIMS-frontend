import React, { useEffect, useState, useContext } from "react";
import useHttp from "hooks/use-http";
import AuthContext from "store/authContext";
import Navbar from "components/Navbar/Navbar";
import styles from "./StudentDashboard.module.css";

const StudentDashboard = () => {
  const [issues, setIssues] = useState([]);
  const { data, get, del, error, loading } = useHttp();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchIssues = async () => {
      await get({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/issues/student/${authCtx.details?.roll_number}`,
        headers: {
          authorization: authCtx.token,
        },
      });
    };
    fetchIssues();
  }, [get, authCtx]);

  useEffect(() => {
    if (data) {
      setIssues(data.issues || []); // Default to an empty array if data.issues is undefined or null
    }
    if (error) {
      alert(error);
    }
  }, [data, error]);

  const handleDelete = async (issueId) => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      try {
        // Find the issue that needs to be deleted
        const issue = issues.find((item) => item.id === issueId);

        if (!issue) {
          alert("Issue not found.");
          return;
        }

        // Step 1: Prepare the payload to reduce issued quantities for the items
        const updateIssuedQuantities = issue.items.map((item) =>
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/inventory/${item.inventory_id}/updateIssuedQuantity`, // Replace with the correct endpoint
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                authorization: authCtx.token,
              },
              body: JSON.stringify({
                issued_qty: -item.quantity, // Decrease issued_qty by the quantity in the deleted issue
              }),
            }
          )
        );

        // Wait for all the quantity update requests to complete
        await Promise.all(updateIssuedQuantities);

        // Step 2: Delete the issue after reducing the issued quantities
        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/issues/delete/${issueId}`,
          {
            method: "DELETE",
            headers: {
              authorization: authCtx.token,
            },
          }
        );

        // Step 3: Update local state to remove the deleted issue from the UI
        setIssues(issues.filter((issue) => issue.issue_id !== issueId));

        alert("Issue deleted successfully.");
      } catch (error) {
        alert("Error deleting issue: " + error.message);
      }
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
        <div className={styles["main-content-heading"]}>Student Dashboard</div>
        {loading && <p>Loading...</p>}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Issue ID</th>
              <th>Request Date</th>
              <th>Items</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.length === 0 ? (
              <tr>
                <td colSpan="5">No issues found</td>
              </tr>
            ) : (
              issues.map((issue) => (
                <tr key={issue.id}>
                  <td>{issue.issue_id}</td>
                  <td>{formatDate(issue.request_date)}</td>
                  <td>
                    <ul>
                      {issue.items.map((item, index) => (
                        <li key={index}>
                          {item.inventory_name}: {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{issue.status}</td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(issue.id)}
                      disabled={issue.status !== "pending"} // Disable button if status is not "pending"
                    >
                      Delete
                    </button>
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

export default StudentDashboard;
