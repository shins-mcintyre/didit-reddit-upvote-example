"use client";

import { useFormStatus , useFormState} from "react-dom";
import { useState, useEffect } from "react";
import clsx from "clsx";
import {
  TbArrowBigDown,
  TbArrowBigDownFilled,
  TbArrowBigUp,
  TbArrowBigUpFilled,
} from "react-icons/tb";
import { FaSpinner } from "react-icons/fa";

export function VoteButtons({ upvote, downvote, votes, existingVote }) {

  const { pending, data, method, action } = useFormStatus();

    // add errors to client
  const [error, setError] = useState(null)
  async function handleAction(action){
    const result = await action();

    if (result?.error){
      setError(result.error);
      setTimeout(()=> setError(null), 3000)
    }
  }

  return (
    <>
      <button formAction={()=> handleAction(upvote)}>
        {existingVote?.vote === 1 ? (
          <TbArrowBigUpFilled
            size={24}
            className={clsx("hover:text-orange-600", {
              "text-pink-300": existingVote?.vote === 1,
            })}
          />
        ) : (
          <TbArrowBigUp
            size={24}
            className={clsx("hover:text-orange-600", {
              "text-pink-300": existingVote?.vote === 1,
            })}
          />
        )}
      </button>

      <span className="w-6 text-center tabular-nums">
        {pending ? (
          <span className="animate-spin h-6  w-6 flex items-center justify-center">
            <FaSpinner />
          </span>
        ) : (
          votes
        )}
      </span>

      <button formAction={()=>handleAction(downvote)}>
        {existingVote?.vote === -1 ? (
          <TbArrowBigDownFilled
            size={24}
            className={clsx("hover:text-blue-600", {
              "text-blue-300": existingVote?.vote === -1,
            })}
          />
        ) : (
          <TbArrowBigDown
            size={24}
            className={clsx("hover:text-blue-600", {
              "text-blue-300": existingVote?.vote === -1,
            })}
          />
        )}
      </button>

      {error &&(
        <span className="text-red-400 text-sm ml-2">
          {error}
        </span>
      )}
    </>
  );
}
