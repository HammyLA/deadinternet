import { generateResponse, generateReply } from '../utility/generationAPICalls';

function HomePage() {
  return (
    <>
      <h1>I am stupid</h1>
      <div className="card">
        <form onSubmit={generateResponse}>
          <input type="text" name="input" placeholder="Enter your prompt here" />
          <button type="submit" name="submit">Generate</button>
        </form>
        <form onSubmit={generateReply}>
          <input type="text" name="input" placeholder="Enter your prompt here" />
          <button type="submit" name="submit">Generate</button>
        </form>
        <p id="response">
          {/* This is where the response will be displayed */}

        </p>
      </div>
      <p className="read-the-docs">
        hi
      </p>
    </>
  )
}

export default HomePage
