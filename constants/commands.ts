export const addCommand = {
  name: "add",
  description: "Submit a review for another user.",

  options: [
    {
      name: "positive",
      description: "Leave a positive review for a user.",
      type: 1,
      options: [
        {
          name: "user",
          description: "Select the user you'd like to review positively.",
          type: 6,
          required: true,
        },
      ],
    },
    {
      name: "negative",
      description: "Leave a negative review for a user.",
      type: 1,
      options: [
        {
          name: "user",
          description: "Select the user you'd like to review negatively.",
          type: 6,
          required: true,
        },
      ],
    },
  ],
};

export const getCommand = {
  name: "get",
  description: "Retrieve reviews for a specific user.",
  type: 1,
  options: [
    {
      name: "user",
      description: "Select the user whose reviews you'd like to view.",
      type: 6,
      required: true,
    },
  ],
};
