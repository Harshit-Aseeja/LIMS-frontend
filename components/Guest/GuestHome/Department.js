import styles from "./Department.module.css";
import Link from "next/link";
const Department = (props) => {
  return (
    <div className={styles.main}>
      <div className={styles["main-header"]}></div>
      <div className={styles["main-content"]}>
        <div className={styles["main-content-heading"]}>
          {props.department.dept_name}
        </div>
        <div className={styles["main-content-subheading"]}>
          HOD: {props.department.hod_name}
        </div>
        <div className={styles["main-footer"]}>
          <Link href={`/labs?id=${props.department.id}`}>
            <button className={styles["main-footer-button"]}>View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Department;
