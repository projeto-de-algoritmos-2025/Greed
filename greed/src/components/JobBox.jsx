import './JobBox.css';

export default function JobBox({ job, color }) {
  return (
    <div className="job-box" style={{ borderLeft: `4px solid ${color || '#007bff'}` }}>
      <h4>{job.name}</h4>
      <p>Início: <strong>{job.start}</strong></p>
      <p>Fim: <strong>{job.end}</strong></p>
    </div>
  );
}
