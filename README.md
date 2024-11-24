# Byte Auction

Byte Auction is a personal project designed to provide a smooth and engaging online auction experience.

---


## ✨ Features
- [x] 🔑 **Google SSO**
- [x] 📦 **Create Items for Bidding**
- [x] 💰 **Place Bids on Public Items**
- [x] 🔔 **Outbid Alerts**

### 🚧 **To-Do List**
- [ ] 🗓️ Select End Date for Bidding
- [ ] 🔔 Email Notifications

---

## Tech Stack

- **Frontend:** [Next.js v15](https://nextjs.org/docs), [Tailwind CSS](https://tailwindcss.com/docs/installation), [Shadcn UI](https://ui.shadcn.com/docs)
- **Backend:** [NextJs Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- **Database:** [Postgres](https://www.postgresql.org/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Authentication:** Google OAuth 2.0 using [Auth.js](https://authjs.dev/)
- **Real-Time Notifications:** [Knock](https://knock.app)

---

## How to Get Started

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/0xprasanth/byte-auction.git
   cd byte-auction
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```
3. **Setup env variables**  
* Refer [.env.example](.env.example) 
* Setup Google OAuth ID in the [console](https://console.cloud.google.com/apis/credentials)
* Setup [Knock](https://knock.app/) account and get the API keys. Refer [Knock Docs for React](https://docs.knock.app/in-app-ui/react/overview)
* Then, create .env before running the application

4. **Run the Application**  
   ```bash
   npm run dev
   ```

5. **Visit the App**  
   Open your browser and navigate to `http://localhost:3000`.

---
## Contributing

Contributions are welcomed greatly! Please fork the repository, create a branch for your feature or bug fix, and submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

Stay tuned for updates and new features! 🚀