import { useState, useEffect, useCallback, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import './App.css'

// Documentation structure - Restructured for clarity
const DOCS_STRUCTURE = {
  title: 'Dooz Atlas',
  sections: [
    {
      name: '🚀 Start Here',
      items: [
        { name: 'Index', path: 'INDEX.md' },
        { name: 'README', path: 'README.md' },
      ]
    },
    {
      name: '📋 SOPs & Policies',
      items: [
        { name: 'Overview', path: '01_SOP/README.md' },
        { name: 'AI Usage SOP', path: '01_SOP/AI_Usage_SOP.md' },
        { name: 'AI Trends 2026', path: '01_SOP/AI_Trends_2026.md' },
        { name: 'Model Routing Policy', path: '01_SOP/Model_Routing_Policy.md' },
        { name: 'Cost Governance', path: '01_SOP/Cost_Governance.md' },
        { name: 'Security & Data Policy', path: '01_SOP/Security_and_Data_Policy.md' },
        { name: 'Deprecation Policy', path: '01_SOP/Deprecation_Policy.md' },
        { name: 'Violations & Escalation', path: '01_SOP/Violations_and_Escalation.md' },
      ]
    },
    {
      name: '📖 Guides',
      items: [
        { name: 'Overview', path: '02_GUIDES/README.md' },
        { name: 'Using Copilot', path: '02_GUIDES/Using_Copilot_Correctly.md' },
        { name: 'Using Agentic Tools', path: '02_GUIDES/Using_Agentic_Tools.md' },
        { name: 'Thinking Models', path: '02_GUIDES/When_to_Use_Thinking_Models.md' },
        { name: 'Self-Hosted Models', path: '02_GUIDES/Self_Hosted_Model_Guide.md' },
        { name: 'Review & Audit', path: '02_GUIDES/Review_and_Audit_Workflows.md' },
        { name: 'Quickstart', path: '09_ECOSYSTEM/02_DEVELOPMENT/Quickstart.md' },
        { name: 'Developer Guide', path: '09_ECOSYSTEM/02_DEVELOPMENT/Developer_Guide.md' },
        { name: 'Developing Apps', path: '09_ECOSYSTEM/02_DEVELOPMENT/Developing_Apps.md' },
        { name: 'Coding Standards', path: '09_ECOSYSTEM/02_DEVELOPMENT/Coding_Standards.md' },
        { name: 'Testing Guide', path: '09_ECOSYSTEM/02_DEVELOPMENT/Testing_Guide.md' },
        { name: 'Client App Guide', path: '09_ECOSYSTEM/02_DEVELOPMENT/Client_App_Guide.md' },
      ]
    },
    {
      name: '🧠 Frameworks',
      items: [
        { name: 'Overview', path: '03_FRAMEWORKS/README.md' },
        { name: 'Task Classification', path: '03_FRAMEWORKS/Task_Classification_Framework.md' },
        { name: 'Agentic Control', path: '03_FRAMEWORKS/Agentic_Control_Framework.md' },
        { name: 'Architecture vs Execution', path: '03_FRAMEWORKS/Architecture_vs_Execution.md' },
        { name: 'Human in the Loop', path: '03_FRAMEWORKS/Human_in_the_Loop_Model.md' },
        { name: 'Cost vs Leverage', path: '03_FRAMEWORKS/Cost_vs_Leverage_Framework.md' },
        { name: 'Identity Token (DIT)', path: '03_FRAMEWORKS/Dooz_Identity_Token.md' },
        { name: 'Memory Patterns', path: '03_FRAMEWORKS/Organizational_Memory_Patterns.md' },
      ]
    },
    {
      name: '💬 Prompt Library',
      items: [
        { name: 'Overview', path: '04_PROMPT_LIBRARY/README.md' },
        { name: 'System Design', path: '04_PROMPT_LIBRARY/Architecture/System_Design.md' },
        { name: 'Refactor Planning', path: '04_PROMPT_LIBRARY/Architecture/Refactor_Planning.md' },
        { name: 'Risky Logic', path: '04_PROMPT_LIBRARY/Architecture/Risky_Logic.md' },
        { name: 'Feature Implementation', path: '04_PROMPT_LIBRARY/Implementation/Feature_Implementation.md' },
        { name: 'API Handlers', path: '04_PROMPT_LIBRARY/Implementation/API_Handlers.md' },
        { name: 'UI Wiring', path: '04_PROMPT_LIBRARY/Implementation/UI_Wiring.md' },
        { name: 'Adversarial Review', path: '04_PROMPT_LIBRARY/Review/Adversarial_Review.md' },
        { name: 'Spec Mismatch', path: '04_PROMPT_LIBRARY/Review/Spec_Mismatch.md' },
        { name: 'Security Check', path: '04_PROMPT_LIBRARY/Review/Security_Check.md' },
        { name: 'Renaming', path: '04_PROMPT_LIBRARY/Mechanical/Renaming.md' },
        { name: 'Formatting', path: '04_PROMPT_LIBRARY/Mechanical/Formatting.md' },
        { name: 'Scaffolding', path: '04_PROMPT_LIBRARY/Mechanical/Scaffolding.md' },
      ]
    },
    {
      name: '📚 Knowledge Base',
      items: [
        { name: 'Overview', path: '05_KNOWLEDGE_BASE/README.md' },
        { name: 'Lessons Learned', path: '05_KNOWLEDGE_BASE/Lessons_Learned.md' },
        { name: 'Failure Case Studies', path: '05_KNOWLEDGE_BASE/Failure_Case_Studies.md' },
        { name: 'Cost Postmortems', path: '05_KNOWLEDGE_BASE/Cost_Explosion_Postmortems.md' },
        { name: 'Model Behavior', path: '05_KNOWLEDGE_BASE/Model_Behavior_Notes.md' },
        { name: 'Tool Comparison', path: '05_KNOWLEDGE_BASE/Tool_Comparison.md' },
      ]
    },
    {
      name: '🤖 UI & Agentic AI',
      items: [
        { name: 'Overview', path: '06_UI_AGENTIC_AI/README.md' },
        { name: 'UX Principles', path: '06_UI_AGENTIC_AI/UX_Principles.md' },
        { name: 'Guardrails & Permissions', path: '06_UI_AGENTIC_AI/Guardrails_and_Permissions.md' },
        { name: 'Agent Metadata Schema', path: '06_UI_AGENTIC_AI/Agent_Metadata_Schema.md' },
        { name: 'Token Tracking', path: '06_UI_AGENTIC_AI/Token_Tracking_Design.md' },
        { name: 'Cost Visualization', path: '06_UI_AGENTIC_AI/Cost_Visualization.md' },
        { name: 'Reference Architecture', path: '06_UI_AGENTIC_AI/Reference_Architecture.md' },
      ]
    },
    {
      name: '🔧 Implementation',
      items: [
        { name: 'Overview', path: '07_IMPLEMENTATION/README.md' },
        { name: 'AG-Guard Plugin', path: '07_IMPLEMENTATION/AG_Guard_Plugin.md' },
        { name: 'Logging & Observability', path: '07_IMPLEMENTATION/Logging_and_Observability.md' },
        { name: 'Redmine Integration', path: '07_IMPLEMENTATION/Redmine_Integration.md' },
        { name: 'CI/CD Enforcement', path: '07_IMPLEMENTATION/CI_CD_Enforcement.md' },
        { name: 'Self-Hosted Inference', path: '07_IMPLEMENTATION/Self_Hosted_Inference.md' },
      ]
    },
    {
      name: '🌐 Ecosystem',
      items: [
        { name: 'Index', path: '09_ECOSYSTEM/README.md' },
        { name: 'Overview', path: '09_ECOSYSTEM/01_CORE/Overview.md' },
        { name: 'Component Catalog', path: '09_ECOSYSTEM/01_CORE/Component_Catalog.md' },
        { name: 'Architecture', path: '09_ECOSYSTEM/01_CORE/Architecture.md' },
        { name: 'Platform Boundaries', path: '09_ECOSYSTEM/01_CORE/Platform_Boundaries.md' },
        { name: 'Welcome', path: '09_ECOSYSTEM/01_CORE/Welcome.md' },
        { name: 'Core Doctrine', path: '09_ECOSYSTEM/01_CORE/Core_Doctrine.md' },
        { name: 'Brain Integration', path: '09_ECOSYSTEM/03_INTEGRATIONS/Brain_Integration.md' },
        { name: 'Dooz Sync', path: '09_ECOSYSTEM/03_INTEGRATIONS/Dooz_Sync_Integration.md' },
        { name: 'Webhook Patterns', path: '09_ECOSYSTEM/03_INTEGRATIONS/Webhook_Patterns.md' },
        { name: 'Cartridge Guide', path: '09_ECOSYSTEM/03_INTEGRATIONS/Cartridge_Guide.md' },
        { name: 'Multi-SDK Arch', path: '09_ECOSYSTEM/03_INTEGRATIONS/Multi_SDK_Architecture.md' },
        { name: 'Enterprise Suites', path: '09_ECOSYSTEM/03_INTEGRATIONS/Enterprise_Suites.md' },
        { name: 'API Contracts', path: '09_ECOSYSTEM/05_TECHNICAL_SPECS/API_Contracts.md' },
        { name: 'Data Model', path: '09_ECOSYSTEM/05_TECHNICAL_SPECS/Data_Model.md' },
        { name: 'Intent Language', path: '09_ECOSYSTEM/05_TECHNICAL_SPECS/Intent_Language.md' },
        { name: 'UI Components', path: '09_ECOSYSTEM/05_TECHNICAL_SPECS/UI_Components.md' },
        { name: 'Migrations Guide', path: '09_ECOSYSTEM/05_TECHNICAL_SPECS/Migrations_Guide.md' },
        { name: 'Deployment', path: '09_ECOSYSTEM/04_OPERATIONS/Deployment.md' },
        { name: 'Dooz Deploy', path: '09_ECOSYSTEM/04_OPERATIONS/Dooz_Deploy.md' },
        { name: 'Monitoring', path: '09_ECOSYSTEM/04_OPERATIONS/Monitoring.md' },
        { name: 'Security', path: '09_ECOSYSTEM/04_OPERATIONS/Security.md' },
        { name: 'Multi-Tenancy', path: '09_ECOSYSTEM/04_OPERATIONS/Multi_Tenancy.md' },
        { name: 'Incident Response', path: '09_ECOSYSTEM/04_OPERATIONS/Incident_Response.md' },
        { name: 'Infrastructure', path: '09_ECOSYSTEM/04_OPERATIONS/Infrastructure_Journey.md' },
      ]
    },
    {
      name: '📱 Apps (Canonical)',
      items: [
        { name: 'Overview', path: '10_APPS/README.md' },
        { name: 'Dooz Core', path: '10_APPS/Dooz_Core.md' },
        { name: 'Dooz Brain', path: '10_APPS/Dooz_Brain.md' },
        { name: 'Dooz Hub', path: '10_APPS/Dooz_Hub.md' },
        { name: 'Dooz Pilot', path: '10_APPS/Dooz_Pilot.md' },
        { name: 'Dooz AI Router', path: '10_APPS/Dooz_AI_Router.md' },
        { name: 'Dooz Copilot', path: '10_APPS/Dooz_Copilot.md' },
        { name: 'Dooz Perspective', path: '10_APPS/Dooz_Perspective.md' },
        { name: 'Dooz PM Suite', path: '10_APPS/Dooz_PM_Suite.md' },
        { name: 'Dooz Hindsight', path: '10_APPS/Dooz_Hindsight.md' },
      ]
    },
    {
      name: '🧩 Apps (Modules)',
      items: [
        { name: 'Dooz Bridge', path: '10_APPS/Dooz_Bridge.md' },
        { name: 'Dooz Sync', path: '10_APPS/Dooz_Sync.md' },
        { name: 'Dooz App Builder', path: '10_APPS/Dooz_App_Builder.md' },
        { name: 'Website Builder', path: '10_APPS/Dooz_Website_Builder.md' },
        { name: 'Dooz Yantra', path: '10_APPS/Dooz_Yantra.md' },
        { name: 'Ballpark AI', path: '10_APPS/Dooz_Ballpark_AI.md' },
        { name: 'Cartridges', path: '10_APPS/Dooz_Cartridges.md' },
        { name: 'Quicky', path: '10_APPS/Quicky.md' },
        { name: 'Worklog', path: '10_APPS/Worklog.md' },
        { name: 'Neo Analog', path: '10_APPS/Neo_Analog.md' },
      ]
    },
    {
      name: '🛠️ Developer SDKs',
      items: [
        { name: 'Intent Language', path: '10_APPS/Dooz_Intent_Lang.md' },
        { name: 'Bun SDK', path: '10_APPS/Dooz_Bun_SDK.md' },
        { name: 'KiloCore SDK', path: '10_APPS/KiloCore_SDK.md' },
        { name: 'App Registry', path: '10_APPS/App_Registry.md' },
      ]
    },
    {
      name: '🔬 Internal Tools',
      items: [
        { name: 'Nonomous AI', path: '10_APPS/NONOMOUS_AI/README.md' },
        { name: 'Nonomous Arch', path: '10_APPS/NONOMOUS_AI/ARCHITECTURE.md' },
        { name: 'Nonomous Decisions', path: '10_APPS/NONOMOUS_AI/DECISIONS.md' },
        { name: 'Jules on Steroids', path: '10_APPS/Jules_on_Steroids.md' },
        { name: 'AgentCraft', path: '10_APPS/AgentCraft.md' },
        { name: 'Laravel Guardian', path: '10_APPS/Laravel_Guardian.md' },
        { name: 'Schema City', path: '10_APPS/Schema_City.md' },
        { name: 'Task Loom', path: '10_APPS/Task_Loom.md' },
        { name: 'VSCode Redmine', path: '10_APPS/VSCode_Redmine.md' },
        { name: 'Cloud Ops Sentinel', path: '10_APPS/Cloud_Ops_Sentinel.md' },
        { name: 'Dooz CIDI', path: '10_APPS/Dooz_CIDI.md' },
        { name: 'Dooz IoT', path: '10_APPS/Dooz_IoT.md' },
        { name: 'Dooz Meet', path: '10_APPS/Dooz_Meet.md' },
        { name: 'Dooz Oracle', path: '10_APPS/Dooz_Oracle.md' },
        { name: 'Core Calibration', path: '10_APPS/Dooz_Core_Calibration.md' },
      ]
    },
    {
      name: '📎 Appendix',
      items: [
        { name: 'Overview', path: '08_APPENDIX/README.md' },
        { name: 'Glossary', path: '08_APPENDIX/Glossary.md' },
        { name: 'Model Reference', path: '08_APPENDIX/Model_Catalog.md' },
        { name: 'Model Landscape 2026', path: '08_APPENDIX/Model_Landscape_2026.md' },
        { name: 'Cost Assumptions', path: '08_APPENDIX/Cost_Assumptions.md' },
        { name: 'Change Log', path: '08_APPENDIX/Change_Log.md' },
      ]
    },
    {
      name: '🗄️ Archive',
      items: [
        { name: 'LLM Vibe Check', path: '10_APPS/LLM_Vibe_Check.md' },
        { name: 'De-Hype', path: '10_APPS/De_Hype.md' },
        { name: 'Echo Tile', path: '10_APPS/Echo_Tile.md' },
        { name: 'IntentFill', path: '10_APPS/IntentFill.md' },
        { name: 'PennyWise', path: '10_APPS/PennyWise.md' },
        { name: 'CookieJar', path: '10_APPS/CookieJar.md' },
        { name: 'Brain MD', path: '10_APPS/Brain_MD.md' },
        { name: 'Camera.py', path: '10_APPS/Camera_py.md' },
        { name: 'Clippys Revenge', path: '10_APPS/Clippys_Revenge.md' },
        { name: 'CalcSheet', path: '10_APPS/CalcSheet.md' },
        { name: 'Experiments Summary', path: '10_APPS/Experiments_Summary.md' },
        { name: 'Nonomous Onboarding', path: '10_APPS/NONOMOUS_AI/ONBOARDING.md' },
        { name: 'Nonomous Roadmap', path: '10_APPS/NONOMOUS_AI/ROADMAP.md' },
        { name: 'Core Roadmap (Legacy)', path: '12_LEGACY_ARCHIVE/Apps/dooz-core/ROADMAP.md' },
        { name: 'Core Technical (Legacy)', path: '12_LEGACY_ARCHIVE/Apps/dooz-core/TECHNICAL.md' },
        { name: 'Brain Roadmap (Legacy)', path: '12_LEGACY_ARCHIVE/Apps/dooz-brain/ROADMAP.md' },
        { name: 'Brain Technical (Legacy)', path: '12_LEGACY_ARCHIVE/Apps/dooz-brain/TECHNICAL.md' },
        { name: 'Hub Roadmap (Legacy)', path: '12_LEGACY_ARCHIVE/Apps/dooz-hub/ROADMAP.md' },
        { name: 'Hub Technical (Legacy)', path: '12_LEGACY_ARCHIVE/Apps/dooz-hub/TECHNICAL.md' },
        { name: 'Sync Roadmap (Legacy)', path: '12_LEGACY_ARCHIVE/Apps/dooz-sync/ROADMAP.md' },
        { name: 'Sync Technical (Legacy)', path: '12_LEGACY_ARCHIVE/Apps/dooz-sync/TECHNICAL.md' },
        { name: 'Pilot Roadmap (Legacy)', path: '12_LEGACY_ARCHIVE/Apps/dooz-pilot/ROADMAP.md' },
        { name: 'Pilot Technical (Legacy)', path: '12_LEGACY_ARCHIVE/Apps/dooz-pilot/TECHNICAL.md' },
        { name: 'Audit: Neo Analog', path: '12_LEGACY_ARCHIVE/Workspace_Audit/neo-analog.md' },
        { name: 'Audit: Dooz Intent Lang', path: '12_LEGACY_ARCHIVE/Workspace_Audit/dooz_intent_lang.md' },
        { name: 'Audit: Dooz Hub', path: '12_LEGACY_ARCHIVE/Workspace_Audit/dooz-hub.md' },
      ]
    },
  ]
}

// Flatten all items for search
const ALL_DOCS = DOCS_STRUCTURE.sections.flatMap(section =>
  section.items.map(item => ({
    ...item,
    section: section.name
  }))
)

// Resolve relative paths from current document
function resolvePath(href, currentPath) {
  if (!href || href.startsWith('http') || href.startsWith('#')) {
    return null
  }

  // Get directory of current document
  const currentDir = currentPath.includes('/')
    ? currentPath.substring(0, currentPath.lastIndexOf('/'))
    : ''

  // Handle relative paths
  let resolved = href
  if (href.startsWith('../')) {
    const parts = currentDir.split('/')
    let hrefParts = href.split('/')
    while (hrefParts[0] === '..') {
      parts.pop()
      hrefParts.shift()
    }
    resolved = [...parts, ...hrefParts].filter(Boolean).join('/')
  } else if (href.startsWith('./')) {
    resolved = currentDir ? `${currentDir}/${href.slice(2)}` : href.slice(2)
  } else if (!href.startsWith('/') && currentDir) {
    resolved = `${currentDir}/${href}`
  }

  return resolved
}

function App() {
  const [activePath, setActivePath] = useState('INDEX.md')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedSections, setExpandedSections] = useState(new Set(['🚀 Start Here']))
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [docContents, setDocContents] = useState({})

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Load document
  useEffect(() => {
    loadDocument(activePath)
  }, [activePath])

  // Pre-fetch all docs for search (on mount)
  useEffect(() => {
    async function fetchAllDocs() {
      const contents = {}
      for (const doc of ALL_DOCS) {
        try {
          const response = await fetch(`/${doc.path}`)
          if (response.ok) {
            contents[doc.path] = await response.text()
          }
        } catch (e) {
          // Ignore errors
        }
      }
      setDocContents(contents)
    }
    fetchAllDocs()
  }, [])

  // Search functionality - triggered on query change when docs are loaded
  const performSearch = useCallback((query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    const queryLower = query.toLowerCase()
    const results = []

    for (const doc of ALL_DOCS) {
      // Check title match first
      if (doc.name.toLowerCase().includes(queryLower)) {
        results.push({
          ...doc,
          matchType: 'title',
          matchText: doc.name
        })
        continue
      }

      // Check content match
      const content = docContents[doc.path]
      if (content) {
        const lowerContent = content.toLowerCase()
        const idx = lowerContent.indexOf(queryLower)
        if (idx !== -1) {
          const start = Math.max(0, idx - 30)
          const end = Math.min(content.length, idx + query.length + 50)
          const matchText = content.substring(start, end)
          results.push({
            ...doc,
            matchType: 'content',
            matchText: (start > 0 ? '...' : '') + matchText + (end < content.length ? '...' : ''),
            matchIndex: idx
          })
        }
      }
    }

    setSearchResults(results.slice(0, 10))
  }, [docContents])

  // Debounced search on query change
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery)
    }, 150)
    return () => clearTimeout(timer)
  }, [searchQuery, performSearch])

  async function loadDocument(path) {
    setLoading(true)
    try {
      const response = await fetch(`/${path}`)
      if (response.ok) {
        const text = await response.text()
        setContent(text)
      } else {
        setContent(`# Document Not Found\n\nCould not load \`${path}\``)
      }
    } catch (error) {
      setContent(`# Error Loading Document\n\n\`\`\`\n${error.message}\n\`\`\``)
    }
    setLoading(false)
  }

  function toggleSection(sectionName) {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionName)) {
      newExpanded.delete(sectionName)
    } else {
      newExpanded.add(sectionName)
    }
    setExpandedSections(newExpanded)
  }

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }

  function handleSearchResultClick(path) {
    setActivePath(path)
    setSearchQuery('')
    setSearchResults([])
    // Expand the section containing this doc
    const doc = ALL_DOCS.find(d => d.path === path)
    if (doc) {
      setExpandedSections(prev => new Set([...prev, doc.section]))
    }
  }

  // Custom link renderer that intercepts .md links
  const linkRenderer = useCallback(({ href, children }) => {
    const resolved = resolvePath(href, activePath)

    if (resolved && resolved.endsWith('.md')) {
      return (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            setActivePath(resolved)
            // Expand the section if needed
            const doc = ALL_DOCS.find(d => d.path === resolved)
            if (doc) {
              setExpandedSections(prev => new Set([...prev, doc.section]))
            }
          }}
        >
          {children}
        </a>
      )
    }

    // External links
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }, [activePath])

  // Highlight search match in text
  function highlightMatch(text, query) {
    if (!query) return text
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.substring(0, idx)}
        <mark>{text.substring(idx, idx + query.length)}</mark>
        {text.substring(idx + query.length)}
      </>
    )
  }

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h1>📚 {DOCS_STRUCTURE.title}</h1>
          <div className="header-actions">
            <button
              className="icon-btn"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              className="icon-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title="Toggle Sidebar"
            >
              ◀
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="search-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {searchQuery && (
            <div className="search-results">
              {searchResults.length > 0 ? (
                searchResults.map((result, idx) => (
                  <div
                    key={idx}
                    className="search-result-item"
                    onClick={() => handleSearchResultClick(result.path)}
                  >
                    <div className="result-title">{result.name}</div>
                    <div className="result-path">{result.section}</div>
                    {result.matchType === 'content' && (
                      <div className="result-match">
                        {highlightMatch(result.matchText, searchQuery)}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-results">No results found</div>
              )}
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {DOCS_STRUCTURE.sections.map(section => (
            <div key={section.name} className="nav-section">
              <button
                className="section-header"
                onClick={() => toggleSection(section.name)}
              >
                <span>{expandedSections.has(section.name) ? '▼' : '▶'}</span>
                <span>{section.name}</span>
              </button>

              {expandedSections.has(section.name) && (
                <ul className="section-items">
                  {section.items.map(item => (
                    <li key={item.path}>
                      <button
                        className={`nav-item ${activePath === item.path ? 'active' : ''}`}
                        onClick={() => setActivePath(item.path)}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="content">
        {!sidebarOpen && (
          <button className="open-sidebar-btn" onClick={() => setSidebarOpen(true)}>
            ☰ Menu
          </button>
        )}

        <div className="content-header">
          <span className="breadcrumb">{activePath}</span>
        </div>

        <article className="markdown-body">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                a: linkRenderer
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </article>
      </main>
    </div>
  )
}

export default App
