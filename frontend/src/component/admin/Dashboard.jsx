import React, { useEffect, useState } from "react";
import BookService from "../../service/BookService";
import CategoryService from "../../service/categoryService";

function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalCategories: 0,
    issuedBooks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const booksRes = await BookService.getAllBooks();

        let categoriesCount = 0;
        try {
          const categoriesRes = await CategoryService.getAllCategory();
          categoriesCount = categoriesRes.data.result?.length || 0;
        } catch (categoryError) {
          console.warn("Category service unavailable");
        }

        setStats({
          totalBooks: booksRes.data.data?.length || 0,
          totalUsers: 0,
          totalCategories: categoriesCount,
          issuedBooks: 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        {/* Books Card */}
        <div className="col-md-3 mb-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-book fs-1"></i>
                </div>
                <div>
                  <h5 className="card-title">{stats.totalBooks}</h5>
                  <p className="card-text">Total Books</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users Card */}
        <div className="col-md-3 mb-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-people fs-1"></i>
                </div>
                <div>
                  <h5 className="card-title">{stats.totalUsers}</h5>
                  <p className="card-text">Total Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Card */}
        <div className="col-md-3 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-tag fs-1"></i>
                </div>
                <div>
                  <h5 className="card-title">{stats.totalCategories}</h5>
                  <p className="card-text">Categories</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Issued Books Card */}
        <div className="col-md-3 mb-4">
          <div className="card bg-warning text-dark">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-journal-check fs-1"></i>
                </div>
                <div>
                  <h5 className="card-title">{stats.issuedBooks}</h5>
                  <p className="card-text">Issued Books</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
