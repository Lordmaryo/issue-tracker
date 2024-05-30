"use client";
import React, { useState } from "react";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import "./custom-styles.css";
import { useRouter } from "next/navigation";

interface issueForm {
  title: string;
  description: string;
}

const NewIssue = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<issueForm>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isSpinning, setIsSpinning] = useState(false);

  return (
    <div className="max-w-xl">
      {errorMessage && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{errorMessage}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-5"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
            setIsSpinning(!isSpinning);
          } catch (error) {
            console.error(error);
            setIsSpinning(isSpinning);
            const errorMessage = !data.title
              ? "Title cannot be empty!"
              : !data.description
              ? "Description cannot be empty!"
              : "An unexpected error occurred";

            setErrorMessage(errorMessage);
          }
        })}
      >
        <TextField.Root size="3" placeholder="Title" {...register("title")} />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button type="submit" disabled={isSpinning}>
          Create New Issue {isSpinning && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssue;
