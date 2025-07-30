import React, { useState, useMemo } from "react";
import "./App.css";

// Color palette from requirements
const COLORS = {
  primary: "#1976d2",
  secondary: "#424242",
  accent: "#fbc02d",
};

// NOTE: In production, replace this with an API endpoint using process.env.VITE_NOTES_API or REACT_APP_NOTES_API, etc.
const API_PLACEHOLDER = process.env.REACT_APP_NOTES_API || "";

const initialNotes = [
  // Example starter notes for UI testing; will be replaced by backend integration
  {
    id: 1,
    title: "Welcome Note",
    content: "Start writing your personal notes here!",
    updatedAt: new Date().toISOString(),
    favorite: false,
  },
];

function getNowIso() {
  return new Date().toISOString();
}

// PUBLIC_INTERFACE
function App() {
  // State for notes, search/filter, editing, and sidebar (mobile)
  const [notes, setNotes] = useState(initialNotes);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null); // id of selected note
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Note form state
  const [form, setForm] = useState({ title: "", content: "", favorite: false });
  const isEditing = selectedId !== null;

  // Filtered notes (by search string)
  const filteredNotes = useMemo(() => {
    const lowSearch = search.toLowerCase();
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(lowSearch) ||
        n.content.toLowerCase().includes(lowSearch)
    );
  }, [notes, search]);

  // PUBLIC_INTERFACE
  function handleSearch(e) {
    setSearch(e.target.value);
  }

  // PUBLIC_INTERFACE
  function startNewNote() {
    setSelectedId(null);
    setForm({ title: "", content: "", favorite: false });
    if (window.innerWidth < 900) setSidebarOpen(false); // close sidebar
  }

  // PUBLIC_INTERFACE
  function selectNote(id) {
    setSelectedId(id);
    const n = notes.find((n) => n.id === id);
    setForm(n ? { ...n } : { title: "", content: "" });
    if (window.innerWidth < 900) setSidebarOpen(false); // close sidebar
  }

  // PUBLIC_INTERFACE
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // PUBLIC_INTERFACE
  function handleSave(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (isEditing) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === selectedId
            ? { ...form, id: selectedId, updatedAt: getNowIso() }
            : n
        )
      );
    } else {
      setNotes((prev) => [
        {
          ...form,
          id: Math.max(0, ...prev.map((n) => n.id)) + 1,
          updatedAt: getNowIso(),
        },
        ...prev,
      ]);
    }
    setForm({ title: "", content: "", favorite: false });
    setSelectedId(null);
  }

  // PUBLIC_INTERFACE
  function handleDelete(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setSelectedId(null);
    setForm({ title: "", content: "", favorite: false });
  }

  // PUBLIC_INTERFACE
  function handleFavorite(id) {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, favorite: !n.favorite } : n
      )
    );
  }

  // For development/demo only API env note
  function apiNotice() {
    if (!API_PLACEHOLDER) {
      return (
        <div className="env-hint">
          <span>
            {/* eslint-disable-next-line */}
            ⚠️ Set your notes API endpoint in <b>process.env.REACT_APP_NOTES_API</b> for real API calls.
          </span>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="notes-app light-theme">
      {/* Header */}
      <header className="header">
        <span className="logo-dot" />
        <span className="app-title">My Notes</span>
        <input
          type="text"
          placeholder="Search notes…"
          className="search-box"
          value={search}
          onChange={handleSearch}
          aria-label="Search notes"
          style={{}}
        />
        <button
          className="add-note-btn"
          style={{ background: COLORS.accent, color: "#212121" }}
          onClick={startNewNote}
          aria-label="Add new note"
        >
          + Add
        </button>
        <span className="desktop-spacer" />
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          ☰
        </button>
      </header>
      {/* Main Content */}
      <div className="container">
        {/* Sidebar */}
        <aside
          className={"sidebar" + (isSidebarOpen ? " open" : "")}
          aria-label="Notes navigation"
        >
          <div className="sidebar-header">Notes</div>
          <ul className="notes-list">
            {filteredNotes.length === 0 && (
              <li className="empty-notes">No notes found.</li>
            )}
            {filteredNotes.map((n) => (
              <li
                key={n.id}
                className={
                  "note-item" +
                  (n.id === selectedId ? " selected" : "") +
                  (n.favorite ? " favorite" : "")
                }
                onClick={() => selectNote(n.id)}
                tabIndex="0"
              >
                <span className="note-title">{n.title}</span>
                {n.favorite && (
                  <span className="favorite-star" title="Favorite">
                    ★
                  </span>
                )}
                <span className="note-date">
                  {new Date(n.updatedAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </aside>
        {/* Notes Editor/Main */}
        <main className="main-area" aria-label="Note editor and detail">
          {apiNotice()}
          <section className="editor-section">
            <form onSubmit={handleSave}>
              <input
                type="text"
                className="note-title-input"
                name="title"
                placeholder="Note title"
                value={form.title}
                onChange={handleChange}
                required
                maxLength={100}
                style={{
                  borderColor: COLORS.accent,
                }}
              />
              <textarea
                className="note-content-input"
                name="content"
                placeholder="Write your note here…"
                value={form.content}
                onChange={handleChange}
                rows={8}
                maxLength={2000}
              />
              <div className="note-form-actions">
                <label className="favorite-toggle">
                  <input
                    type="checkbox"
                    checked={!!form.favorite}
                    name="favorite"
                    onChange={handleChange}
                  />
                  <span>Mark as favorite</span>
                </label>
                <button
                  className="save-btn"
                  style={{ background: COLORS.primary }}
                  type="submit"
                >
                  {isEditing ? "Update" : "Create"}
                </button>
                {isEditing && (
                  <button
                    className="delete-btn"
                    style={{ background: COLORS.secondary }}
                    type="button"
                    onClick={() => handleDelete(selectedId)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </form>
          </section>
          {/* Recent notes quickview */}
          <section className="recent-section">
            <h3>Recent Notes</h3>
            <div className="recent-list">
              {notes.slice(0, 5).map((n) => (
                <div
                  className={
                    "recent-note" +
                    (n.id === selectedId ? " active" : "") +
                    (n.favorite ? " favorite" : "")
                  }
                  key={n.id}
                  onClick={() => selectNote(n.id)}
                >
                  <div className="recent-title">{n.title}</div>
                  <div className="recent-actions">
                    <button
                      className="favorite-btn"
                      aria-label="Toggle favorite"
                      title="Toggle favorite"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavorite(n.id);
                      }}
                      style={{
                        color: n.favorite ? COLORS.accent : "#858585",
                        background: "transparent",
                      }}
                    >
                      ★
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      {/* Footer */}
      <footer className="footer">
        &copy; {new Date().getFullYear()} Notes App – Minimalist React |{" "}
        <span style={{ color: COLORS.primary, fontWeight: 700 }}>Kavia</span>
      </footer>
    </div>
  );
}

export default App;
