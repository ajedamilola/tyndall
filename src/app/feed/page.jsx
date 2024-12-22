"use client";
import { generateMoreArticles } from "@/app/api/user/functions";
import Logout from "@/app/components/logout";
import SessionValidator from "@/app/components/sessionValidator";
import React, { useState } from "react";
import { generateAIArticleContent, generateAIArticles } from "../api/article/functions";

function Page() {
  const [content, setContent] = useState("");
  async function act() {
    setContent("loading");
    let resp = await generateAIArticles({
      domains: ["Math", "Physics", "Chemistry"],
      limit: 10,
      level: "beginner"
    });
    setContent(resp);
  }

  return (
    <div>
      {/* <SessionValidator /> */}
      <button
        className='bg-green-500 px-5 py-2 text-white rounded-lg'
        onClick={act}
      >
        Test AI Generation Abilities
      </button>

      <br />
      {JSON.stringify(content)}
      <Logout />
    </div>
  );
}

export default Page;
