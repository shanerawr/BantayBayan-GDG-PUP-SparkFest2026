import mongoose, { Schema, Document } from 'mongoose';

// ==========================================
// User Schema
// ==========================================
export interface IUser extends Document {
  username: string;
  email: string;
  role: 'citizen' | 'admin' | 'responder';
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['citizen', 'admin', 'responder'],
    default: 'citizen',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// ==========================================
// Report Schema
// ==========================================
export interface IComment {
  user: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
}

export interface IReport extends Document {
  reportedBy: mongoose.Types.ObjectId;
  title: string;
  description: string;
  type: 'flood' | 'fallen-tree' | 'road-work' | 'car-crash' | 'fallen-pole' | 'fire' | 'landslide' | 'other';
  hazardLevel: 'minor' | 'needs-attention' | 'urgent' | 'critical';
  location: {
    type: 'Point';
    coordinates: number[]; // [longitude, latitude]
  };
  address?: string;
  status: 'pending' | 'acknowledged' | 'in-progress' | 'resolved';
  upvotes: number;
  photos: string[];
  comments: IComment[];
  threadCount: number;
  createdAt: Date;
}

const ReportSchema = new Schema<IReport>({
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['flood', 'fallen-tree', 'road-work', 'car-crash', 'fallen-pole', 'fire', 'landslide', 'other'],
    required: true,
  },
  hazardLevel: {
    type: String,
    enum: ['minor', 'needs-attention', 'urgent', 'critical'],
    required: true,
  },
  // Location stored as GeoJSON for spatial indexing
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    // Coordinates array must be formatted as [longitude, latitude]
    coordinates: {
      type: [Number],
      required: true,
    }
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'acknowledged', 'in-progress', 'resolved'],
    default: 'pending',
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  photos: [{
    type: String,
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],
  threadCount: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Create a 2dsphere index on the location field to support geospatial queries
// This is critical for predicting hazardous areas and finding nearby hazards.
ReportSchema.index({ location: "2dsphere" });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const Report = mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);
