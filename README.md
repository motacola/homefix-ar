# HomeFix AR

An innovative augmented reality web application designed to empower users with step-by-step guided assistance for household appliance repairs, leveraging interactive AR technology to simplify complex maintenance tasks.

## Project Overview

HomeFix AR is built to democratize appliance repair by making it accessible to everyone. Using augmented reality, the application visually guides users through repair processes, identifying parts and demonstrating procedures right on their actual appliances.

## Current Features

- Augmented Reality Integration: AR technology for visualizing repair steps directly on appliances
- Appliance Recognition: System detects and identifies common household appliances
- Step-by-Step Repair Guides: Visual walkthroughs for common appliance issues
- Responsive Design: Full functionality across mobile, tablet, and desktop devices
- Popular Repairs Showcase: Quick access to common appliance repair procedures
- Repair History: Track previous repairs and continue unfinished repairs
- Visual Part Identification: AR markers that highlight specific components needing attention
- Settings Customization: User preference storage in local settings
- User Profiles: Basic profile functionality for tracking repair history

## Technical Stack

- Frontend: React with TypeScript
- AR Technology: A-Frame and AR.js
- Styling: Tailwind CSS with shadcn UI components
- State Management: React Query for server state, React Context for application state
- Routing: Wouter for lightweight client-side routing
- Backend: Express.js server with in-memory storage
- Data Validation: Zod schema validation

## Recently Fixed Issues

- Fixed home screen layout issues with improved padding and margins
- Enhanced text contrast by changing background gradient to darker blue/indigo for better readability
- Resolved navigation problems with category icons overlapping with bottom navigation bar
- Improved visibility of stats banner and search functionality
- Refactored component architecture to reduce dependencies on global context
- Added proper error handling for API requests
- Enhanced responsive design for mobile devices

## Future Enhancements Planned

- Advanced Recognition: Enhance appliance recognition without needing AR markers
- iFixit API Integration: Connect with iFixit database for expanded repair guides
- Offline Mode: Save repair guides for offline use
- Social Features: Community sharing of repair tips and successful fixes
- Parts Ordering: Integration with parts suppliers for direct ordering
- Difficulty Estimation: AI-based estimation of repair difficulty and time required
- Expanded Appliance Database: Support for more appliance types and brands
- Tutorial Videos: Integration of short video clips alongside AR instructions
- Voice Commands: Hands-free navigation through repair steps

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies
3. Start the development server
4. Open your browser and navigate to localhost:5000

## Usage

1. Launch the application and allow camera access when prompted
2. Point your device at an appliance to scan it
3. Follow the AR guides that appear, showing you step-by-step how to complete the repair
4. Navigate through steps using the on-screen controls
5. Access your repair history and saved guides in the profile section

## Project Structure

- /client: Frontend React application
- /server: Backend Express application
- /shared: Shared code between frontend and backend

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- A-Frame for AR capabilities
- shadcn UI for accessible component designs
- The React community for excellent documentation and support