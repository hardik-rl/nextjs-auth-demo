// // Temporary in-memory user storage (replace with DB later)
// type User = {
//   email: string;
//   password: string; // ⚠️ plain text for demo only (use bcrypt in real app)
// };

// const users: User[] = [];

// export function addUser(email: string, password: string) {
//   const exists = users.find((u) => u.email === email);
//   if (exists) throw new Error("User already exists");
//   users.push({ email, password });
//   return { email };
// }

// export function findUser(email: string, password: string) {
//   return users.find((u) => u.email === email && u.password === password);
// }


import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "users.json");

type User = {
  email: string;
  password: string; // ⚠ plain text for demo
};

function loadUsers(): User[] {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
}

function saveUsers(users: User[]) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export function addUser(email: string, password: string) {
  const users = loadUsers();
  if (users.find((u) => u.email === email)) throw new Error("User already exists");
  users.push({ email, password });
  saveUsers(users);
  return { email };
}

export function findUser(email: string, password: string) {
  const users = loadUsers();
  return users.find((u) => u.email === email && u.password === password);
}
