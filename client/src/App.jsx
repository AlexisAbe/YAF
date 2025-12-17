import React, { useEffect, useMemo, useState } from "react";
import { fetchCreatives, createCreative, updateCreative, deleteCreative } from "./api.js";
import { sanitizeText } from "./sanitize.js";

const PLATFORM_URL = {
  META: "https://linktr.ee/yafrica",
  TIKTOK: "https://linktr.ee/yafrica",
  YOUTUBE: "https://www.youtube.com/playlist?list=PLSCwkooe6sD5jZothn-JbsfdWNl_2UCUk",
};

function platformUrl(platforms) {
  const p = String(platforms || "").toUpperCase();
  if (p.includes("YOUTUBE") && !(p.includes("META") || p.includes("TIKTOK"))) return PLATFORM_URL.YOUTUBE;
  // default: Meta/TikTok Linktree
  return PLATFORM_URL.META;
}

async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="modalBackdrop" onMouseDown={onClose}>
      <div className="card modal" onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [season, setSeason] = useState("");
  const [targeting, setTargeting] = useState("");
  const [platform, setPlatform] = useState("");
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState("");

  async function refresh() {
    setLoading(true);
    setErr("");
    try {
      const data = await fetchCreatives({
        season: season || undefined,
        targeting: targeting || undefined,
        platform: platform || undefined,
        q: q || undefined,
      });
      setRows(data);
    } catch (e) {
      setErr(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refresh(); }, []); // initial
  useEffect(() => {
    const t = setTimeout(() => refresh(), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [season, targeting, platform, q]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 1200);
  }

  const targetingOptions = useMemo(() => {
    const s = new Set(rows.map(r => r.targeting).filter(Boolean));
    return Array.from(s).sort();
  }, [rows]);

  const handleNew = () => {
    setEditing({
      video: "",
      format: "9/16",
      season: 1,
      targeting: "Culture",
      platforms: "META,TIKTOK,YOUTUBE",
      wording: ""
    });
  };

  const handleSave = async () => {
    const payload = {
      video: editing.video,
      format: editing.format,
      season: Number(editing.season),
      targeting: editing.targeting,
      platforms: editing.platforms,
      wording: editing.wording
    };
    if (!payload.video || !payload.wording) {
      showToast("Video + Wording requis");
      return;
    }
    try {
      if (editing.id) {
        await updateCreative(editing.id, payload);
      } else {
        await createCreative(payload);
      }
      setEditing(null);
      await refresh();
      showToast("Enregistré");
    } catch (e) {
      showToast("Erreur save");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer cette ligne ?")) return;
    try {
      await deleteCreative(id);
      await refresh();
      showToast("Supprimé");
    } catch {
      showToast("Erreur delete");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div>
          <h2 style={{margin:0}}>YAfrica – Setup Trader</h2>
          <small className="muted">Copie propre (sans typo IA) + URL correcte par plateforme.</small>
        </div>
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <a href="/api/export.csv" target="_blank" rel="noreferrer">
            <button>Exporter CSV</button>
          </a>
          <button className="primary" onClick={handleNew}>+ Ajouter</button>
        </div>
      </div>

      <div className="card controls">
        <select value={season} onChange={(e)=>setSeason(e.target.value)}>
          <option value="">Toutes saisons</option>
          <option value="1">Saison 1</option>
          <option value="2">Saison 2</option>
          <option value="3">Saison 3</option>
        </select>

        <select value={platform} onChange={(e)=>setPlatform(e.target.value)}>
          <option value="">Toutes plateformes</option>
          <option value="META">Meta</option>
          <option value="TIKTOK">TikTok</option>
          <option value="YOUTUBE">YouTube</option>
        </select>

        <input
          placeholder="Ciblage (ex: Culture, Sport)"
          value={targeting}
          onChange={(e)=>setTargeting(e.target.value)}
          list="targetings"
        />
        <datalist id="targetings">
          {targetingOptions.map(t => <option key={t} value={t} />)}
        </datalist>

        <input
          placeholder="Recherche (video / wording)"
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          style={{minWidth:260, flex:1}}
        />
      </div>

      <div className="card" style={{marginTop:12, overflowX:"auto"}}>
        {loading ? (
          <div style={{padding:16}}>Chargement…</div>
        ) : err ? (
          <div style={{padding:16}}>Erreur: {err}</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Video</th>
                <th>Format</th>
                <th>Saison</th>
                <th>Ciblage</th>
                <th>Plateforme</th>
                <th>Wording</th>
                <th>URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const url = platformUrl(r.platforms);
                const wordingClean = sanitizeText(r.wording);
                return (
                  <tr key={r.id}>
                    <td><strong>{r.video}</strong></td>
                    <td>{r.format}</td>
                    <td><span className="badge">S{r.season}</span></td>
                    <td>{r.targeting}</td>
                    <td>
                      {String(r.platforms || "").split(",").map(p => (
                        <span key={p} className="badge">{p.trim()}</span>
                      ))}
                    </td>
                    <td style={{minWidth:340, whiteSpace:"pre-line"}}>{wordingClean}</td>
                    <td style={{minWidth:260}}>
                      <code style={{fontSize:12}}>{url}</code>
                    </td>
                    <td style={{minWidth:240}}>
                      <div className="rowActions">
                        <button onClick={async ()=>{await copyToClipboard(wordingClean); showToast("Wording copié");}}>
                          Copier wording
                        </button>
                        <button onClick={async ()=>{await copyToClipboard(url); showToast("URL copiée");}}>
                          Copier URL
                        </button>
                        <button className="primary" onClick={async ()=>{
                          await copyToClipboard(`${wordingClean}\\n\\n${url}`);
                          showToast("Pack copié");
                        }}>
                          Copier pack
                        </button>
                        <button onClick={()=>setEditing({...r})}>Modifier</button>
                        <button className="danger" onClick={()=>handleDelete(r.id)}>Suppr.</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr><td colSpan="8" style={{padding:16}}>Aucune ligne.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal open={!!editing} onClose={()=>setEditing(null)}>
        {editing && (
          <>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:12}}>
              <h3 style={{margin:"6px 0"}}>{editing.id ? "Modifier" : "Ajouter"} une créa</h3>
              <button onClick={()=>setEditing(null)}>Fermer</button>
            </div>

            <div className="grid">
              <div>
                <label><small className="muted">Video</small></label>
                <input value={editing.video || ""} onChange={(e)=>setEditing({...editing, video:e.target.value})} style={{width:"100%"}} />
              </div>
              <div>
                <label><small className="muted">Format</small></label>
                <input value={editing.format || ""} onChange={(e)=>setEditing({...editing, format:e.target.value})} style={{width:"100%"}} />
              </div>
              <div>
                <label><small className="muted">Saison</small></label>
                <select value={editing.season} onChange={(e)=>setEditing({...editing, season:e.target.value})} style={{width:"100%"}}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div>
                <label><small className="muted">Ciblage</small></label>
                <input value={editing.targeting || ""} onChange={(e)=>setEditing({...editing, targeting:e.target.value})} style={{width:"100%"}} />
              </div>
              <div style={{gridColumn:"1 / -1"}}>
                <label><small className="muted">Plateforme (ex: META,TIKTOK,YOUTUBE)</small></label>
                <input value={editing.platforms || ""} onChange={(e)=>setEditing({...editing, platforms:e.target.value})} style={{width:"100%"}} />
              </div>
              <div style={{gridColumn:"1 / -1"}}>
                <label><small className="muted">Wording (il sera nettoyé automatiquement)</small></label>
                <textarea value={editing.wording || ""} onChange={(e)=>setEditing({...editing, wording:e.target.value})} />
                <div style={{marginTop:8}}>
                  <small className="muted">Preview (sanitizé) :</small>
                  <div className="card" style={{padding:10, marginTop:6, whiteSpace:"pre-line"}}>
                    {sanitizeText(editing.wording || "") || "—"}
                  </div>
                </div>
              </div>
            </div>

            <div style={{display:"flex", gap:10, justifyContent:"flex-end", marginTop:12}}>
              <button onClick={()=>setEditing(null)}>Annuler</button>
              <button className="primary" onClick={handleSave}>Enregistrer</button>
            </div>
          </>
        )}
      </Modal>

      {toast && (
        <div className="card" style={{
          position:"fixed", bottom:18, right:18, padding:"10px 12px",
          borderColor:"#ddd"
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}
