import styles from "./AddCategory.module.css";

function AddCategory() {
  return (
    <div className={styles.containerForm}>
      <h2>Create new Category</h2>
      <form
        action="/addcategory"
        method="post"
        className={styles.addCategoryForm}
      >
        <div className={styles.containerLabelInput}>
          <label htmlFor="name">
            Name<span aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Cruising"
            required
          />
        </div>
        <div className={styles.containerLabelInput}>
          <label htmlFor="description">
            Description<span aria-label="required">*</span>
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="For days when I just want to cruise around"
            required
          ></textarea>
        </div>
        <button type="submit" className={styles.submitBtn}>Add Category</button>
      </form>
    </div>
  );
}

export default AddCategory;
