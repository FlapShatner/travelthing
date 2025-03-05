'use server';
import { getServerSession } from '@/server/auth-actions';
import { userProfile } from '@/data-access/profile-queries';
import { UserProfile } from '@/db/schema';
import { ActionResponse } from '@/data/types';

const validateUser = async (userId: string): Promise<boolean> => {
  try {
    const session = await getServerSession();
    if (!session) {
      return false;
    }
    if (session.user.id !== userId) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error validating user:', error);
    return false;
  }
};

export const getUserProfile = async (
  userId: string
): Promise<ActionResponse<UserProfile>> => {
  try {
    const session = await getServerSession();
    if (!session) {
      return {
        data: null,
        error: 'Authentication required',
        success: false,
      };
    }

    const user = await userProfile.getUserProfile(userId);
    return {
      data: user,
      error: null,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return {
      data: null,
      error: 'Failed to fetch user profile',
      success: false,
    };
  }
};

export const createUserProfile = async (
  userData: UserProfile
): Promise<ActionResponse<UserProfile>> => {
  try {
    const isValidUser = await validateUser(userData.userId);
    if (!isValidUser) {
      return {
        data: null,
        error: 'Unauthorized access',
        success: false,
      };
    }

    const user = await userProfile.createUserProfile(userData);
    return {
      data: user,
      error: null,
      success: true,
    };
  } catch (error) {
    console.error('Error creating user profile:', error);
    return {
      data: null,
      error: 'Failed to create user profile',
      success: false,
    };
  }
};

export const updateUserProfile = async (
  userData: UserProfile,
  userId: string
): Promise<ActionResponse<UserProfile>> => {
  try {
    const isValidUser = await validateUser(userData.userId);
    if (!isValidUser) {
      return {
        data: null,
        error: 'Unauthorized access',
        success: false,
      };
    }

    const user = await userProfile.updateUserProfile(userData, userId);
    return {
      data: user,
      error: null,
      success: true,
    };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return {
      data: null,
      error: 'Failed to update user profile',
      success: false,
    };
  }
};

export const deleteUserProfile = async (
  userId: string
): Promise<ActionResponse<void>> => {
  try {
    const isValidUser = await validateUser(userId);
    if (!isValidUser) {
      return {
        data: null,
        error: 'Unauthorized access',
        success: false,
      };
    }

    await userProfile.deleteUserProfile(userId);
    return {
      data: null,
      error: null,
      success: true,
    };
  } catch (error) {
    console.error('Error deleting user profile:', error);
    return {
      data: null,
      error: 'Failed to delete user profile',
      success: false,
    };
  }
};
