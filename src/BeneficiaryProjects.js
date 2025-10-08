import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BeneficiaryProjects = ({ beneficiaryId }) => {
  const [projects, setProjects] = useState([]);
  const [beneficiaryProjects, setBeneficiaryProjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load all projects + beneficiary's project benefit status
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, benProjRes] = await Promise.all([
          axios.get('/api/projects'),
          axios.get(`/api/beneficiaries/${beneficiaryId}/projects`),
        ]);

        setProjects(projRes.data);

        // Map beneficiary project statuses by project_id
        const benProjMap = {};
        benProjRes.data.forEach(p => {
          benProjMap[p.project_id] = p.has_benefited;
        });
        setBeneficiaryProjects(benProjMap);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [beneficiaryId]);

  // Handle toggle benefit status
  const handleToggle = async (projectId) => {
    const currentStatus = beneficiaryProjects[projectId] || 'no';
    const newStatus = currentStatus === 'yes' ? 'no' : 'yes';

    // Optimistic UI update
    setBeneficiaryProjects(prev => ({
      ...prev,
      [projectId]: newStatus,
    }));

    setSaving(true);

    try {
      await axios.put(`/api/beneficiaries/${beneficiaryId}/projects/${projectId}`, {
        has_benefited: newStatus,
      });
    } catch (err) {
      console.error('Failed to update benefit status:', err);
      // Revert UI on failure
      setBeneficiaryProjects(prev => ({
        ...prev,
        [projectId]: currentStatus,
      }));
    }

    setSaving(false);
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div>
      <h3>Projects and Benefit Status</h3>
      <ul>
        {projects.map(project => (
          <li key={project.id} style={{ marginBottom: '10px' }}>
            <strong>{project.name}</strong> - Benefited:{' '}
            <button onClick={() => handleToggle(project.id)} disabled={saving}>
              {beneficiaryProjects[project.id] === 'yes' ? 'Yes' : 'No'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BeneficiaryProjects;
