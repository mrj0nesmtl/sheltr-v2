export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
}

export interface NavigationSection {
  items: NavigationItem[];
  isPublic?: boolean;
} 