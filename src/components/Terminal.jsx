import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const terminalCommands = {
  help: "Available commands: help, about, skills, projects, contact, clear, whoami, ls, cat",
  about: "Hi! I'm a pre-final year B.Tech Computer Science student with hands-on experience in ML, Robotics, and Web Development.",
  skills: "Python, JavaScript, C++, Machine Learning, Cloud Computing, Embedded Systems",
  projects: "Type 'ls projects/' for more details or click 'View Projects' button.",
  contact: "Email: ravnishkumar583@gmail.com | LinkedIn: /in/ravnish-kumar/",
  whoami: "Student, ML Enthusiast, Web Developer, Technologist.",
  clear: "CLEAR_TERMINAL",
  ls: "projects/  skills.txt  about.md  contact.txt",
  "ls projects/": "portfolio/ oh-my-foodie/ ai-text-gen/ workflows/",
  "cat skills.txt": "Python, JavaScript, C++, Postman, MySQL, \n Machine Learning, AI, Cloud Computing, Embedded Systems",
  "cat about.md": "# Ravnish Kumar,\n passionate about creating innovative solutions to real-world problems.",
  "cat contact.txt": "Email: ravnishkumar583@gmail.com\nGitHub: github.com/ravnish1"
}

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'input', text: 'boot sequence initiated...' },
    { type: 'input', text: 'loading modules [██████████] 100%' },
    { type: 'input', text: 'whoami' },
    { type: 'response', text: ">I’m Ravnish Kumar, a Computer Science student and technologist specializing in Web, ML, and IoT." },
  ])
  const [inputValue, setInputValue] = useState('')
  const terminalBodyRef = useRef(null)
  const inputRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const command = inputValue.trim().toLowerCase()
      
      if (command === 'clear') {
        setHistory([])
      } else if (terminalCommands[command] === 'CLEAR_TERMINAL') {
        setHistory([])
      } else {
        const newHistory = [...history, { type: 'input', text: inputValue }]
        
        if (terminalCommands[command]) {
          newHistory.push({ type: 'response', text: terminalCommands[command] })
        } else if (command !== '') {
          newHistory.push({ type: 'response', text: `Command not found: ${command}. Type 'help' for available commands.` })
        }
        
        setHistory(newHistory)
      }
      
      setInputValue('')
    }
  }

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
    
    // Animate latest response
    if (history.length > 0) {
      const latest = history[history.length - 1]
      if (latest.type === 'response') {
        // Use timeout to allow React to render DOM first
        setTimeout(() => {
          const elements = terminalBodyRef.current.querySelectorAll('.terminal-response')
          const lastEl = elements[elements.length - 1]
          if (lastEl) {
            gsap.fromTo(lastEl, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3 })
          }
        }, 10)
      }
    }
  }, [history])

  return (
    <div 
      className="terminal glass-panel neo-border" 
      onClick={() => inputRef.current?.focus()}
    >
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="btn close"></span>
          <span className="btn minimize"></span>
          <span className="btn maximize"></span>
        </div>
        <div className="terminal-title">SYS://ravnish_portfolio</div>
      </div>
      
      <div className="terminal-body" id="terminal-body" ref={terminalBodyRef}>
        <div className="terminal-output" id="terminal-output">
          {history.map((line, idx) => (
            line.type === 'input' ? (
              <div key={idx} className="terminal-line init-anim">
                <span className="prompt">ravnish@sys:~$</span> {line.text}
              </div>
            ) : (
              <div key={idx} className="terminal-response init-anim">
                {line.text.split('\n').map((str, i) => (
                  <React.Fragment key={i}>
                    {str}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            )
          ))}
        </div>
        
        <div className="terminal-input-line">
          <span className="prompt">ravnish@sys:~$</span>
          <input
            type="text"
            className="terminal-input"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' to begin..."
            autoComplete="off"
            spellCheck="false"
          />
          <span className="terminal-cursor">_</span>
        </div>
      </div>
    </div>
  )
}
