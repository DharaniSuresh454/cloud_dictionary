## 🎯 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🌟 Features in Detail

### Search Functionality
- Type to search cloud terms in real-time
- Autocomplete suggestions appear as you type
- Click suggestions or press Enter to search
- Clear search to see all terms

### Theme Toggle
- Click the sun/moon icon in the top-right corner
- Theme preference is saved in localStorage
- Smooth transitions between themes

### Responsive Design
- Mobile-first approach
- Flexible card layout
- Optimized for all screen sizes

## 📝 Sample Cloud Terms

The app includes definitions for popular cloud computing terms such as:
- AWS KMS
- Azure Blob Storage
- Google Cloud Pub/Sub
- IAM (Identity and Access Management)
- Docker
- Kubernetes
- Serverless
- Microservices
- Load Balancer
- CDN (Content Delivery Network)

## 🎨 Customization

### Adding New Terms
Edit the `termsData` array in `src/App.tsx`:

```typescript
const termsData: Term[] = [
  {
    term: "Your Term",
    description: "Your description here"
  },
  // Add more terms...
];
```

### Styling
- Modify Tailwind classes in component files
- Update `tailwind.config.js` for custom colors/themes
- Edit `src/index.css` for global styles

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload the `build` folder to an S3 bucket

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at scale

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ for the cloud computing community**


