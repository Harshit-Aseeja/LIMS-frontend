import React, { useEffect, useState, useContext } from "react";
import useHttp from "hooks/use-http";
import AuthContext from "store/authContext";
import Navbar from "components/Navbar/Navbar";
import styles from "./StudentDashboard.module.css";

const StudentDashboard = () => {
  const [issues, setIssues] = useState([]);
  const { data, get, error, loading } = useHttp();
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

  const handleEdit = (issueId) => {
    // Implement the edit functionality
    alert(`Edit issue with ID: ${issueId}`);
  };

  const handleDelete = (issueId) => {
    // Implement the delete functionality
    alert(`Delete issue with ID: ${issueId}`);
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
                  <td>{issue.id}</td>
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
                    <button onClick={() => handleEdit(issue.id)}>Edit</button>
                    <button onClick={() => handleDelete(issue.id)}>
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
