# API Endpoint Specifications & Database Schemas

## MongoDB Schemas

### 1. `User` Schema (`backend/models/User.js`)
```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['contributor', 'admin', 'student'], 
    default: 'contributor' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
```

### 2. `HistoricalResource` Schema (`backend/models/HistoricalResource.js`)
```javascript
const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  chronologicalEra: { 
    type: String, 
    required: true,
    enum: ['Pre-Colonial / Indigenous', 'Spanish Era', 'American Era', 'World War II', 'Post-War / Modern Era']
  },
  barangay: { type: String, required: true },
  localHero: { type: String, default: 'N/A' },
  fileUrl: { type: String, required: true },
  fileType: { type: String, default: 'pdf' },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HistoricalResource', ResourceSchema);
```

---

## API Endpoints List

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create contributor/admin account
- `POST /api/auth/login` - Authenticate user & return JWT token

### Historical Resources (`/api/resources`)
- `GET /api/resources` - Fetch all **approved** resources (Supports `?era=`, `?barangay=`, and `?search=`)
- `GET /api/resources/pending` - Fetch all **pending** resources (Admin only)
- `POST /api/resources/upload` - Submit manual with metadata & PDF file attachment
- `PUT /api/resources/:id/status` - Update submission status (`approved` or `rejected`)
- `DELETE /api/resources/:id` - Delete resource entry