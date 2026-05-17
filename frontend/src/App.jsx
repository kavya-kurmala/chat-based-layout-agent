import { useState } from "react";
import axios from "axios";
import { initialLayout } from "./initialLayout";
import "./App.css";

function App() {
  const [layoutJson, setLayoutJson] = useState(initialLayout);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = message;
    setChat((prev) => [...prev, { role: "user", text: userMsg }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: userMsg,
        layoutJson
      });

      setLayoutJson(res.data.updatedJson);

      setChat((prev) => [
        ...prev,
        {
          role: "agent",
          text: "Layout JSON updated successfully."
        }
      ]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        {
          role: "agent",
          text: "Error updating layout JSON."
        }
      ]);
    }

    setLoading(false);
  };

  const artboard = layoutJson.nodes["artboard_1778485662755_3"];
  const nodes = Object.values(layoutJson.nodes).filter(
    (node) => node.parentId === "artboard_1778485662755_3"
  );

  return (
    <div className="app">
      <h1>Chat-Based Layout Agent</h1>

      <div className="main">
        <div className="left">
          <h2>Chat</h2>

          <div className="chatBox">
            {chat.map((item, index) => (
              <div key={index} className={item.role}>
                <strong>{item.role === "user" ? "You" : "Agent"}:</strong>{" "}
                {item.text}
              </div>
            ))}
          </div>

          <textarea
            placeholder="Example: Convert this design to 9:16"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={sendMessage} disabled={loading}>
            {loading ? "Updating..." : "Send"}
          </button>

          <div className="examples">
            <p>Try:</p>
            <button onClick={() => setMessage("Convert this design to 9:16")}>
              Convert to 9:16
            </button>
            <button onClick={() => setMessage("Move the headline to the top")}>
              Move headline to top
            </button>
            <button onClick={() => setMessage("Make the headline smaller")}>
              Make headline smaller
            </button>
            <button onClick={() => setMessage("Move the offer badge higher")}>
              Move badge higher
            </button>
          </div>
        </div>

        <div className="middle">
          <h2>Wireframe Preview</h2>

          <div
            className="preview"
            style={{
              aspectRatio: `${artboard.width} / ${artboard.height}`
            }}
          >
            {nodes.map((node) => {
              if (node.type === "text") {
                return (
                  <div
                    key={node.id}
                    className="previewText"
                    style={{
                      left: `${(node.x / artboard.width) * 100}%`,
                      top: `${(node.y / artboard.height) * 100}%`,
                      width: `${(node.width / artboard.width) * 100}%`,
                      height: `${(node.height / artboard.height) * 100}%`,
                      fontSize: Math.max(
                        8,
                        (node.style?.visual?.fontSize || 30) / 10
                      )
                    }}
                  >
                    {node.data?.content}
                  </div>
                );
              }

              if (node.type === "shape") {
                return (
                  <div
                    key={node.id}
                    className="previewShape"
                    style={{
                      left: `${(node.x / artboard.width) * 100}%`,
                      top: `${(node.y / artboard.height) * 100}%`,
                      width: `${(node.width / artboard.width) * 100}%`,
                      height: `${(node.height / artboard.height) * 100}%`
                    }}
                  />
                );
              }

              if (node.type === "image") {
                return (
                  <div
                    key={node.id}
                    className="previewImage"
                    style={{
                      left: `${(node.x / artboard.width) * 100}%`,
                      top: `${(node.y / artboard.height) * 100}%`,
                      width: `${(node.width / artboard.width) * 100}%`,
                      height: `${(node.height / artboard.height) * 100}%`
                    }}
                  >
                    {node.name}
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>

        <div className="right">
          <h2>Updated JSON</h2>
          <pre>{JSON.stringify(layoutJson, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;