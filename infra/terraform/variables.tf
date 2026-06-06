variable "subscription_id" {
  description = "Azure Subscription ID"
  type        = string
}

variable "resource_group_name" {
  description = "Existing resource group that contains the VM and networking resources"
  type        = string
  default     = "devops"
}

variable "virtual_network_name" {
  description = "Existing virtual network name"
  type        = string
  default     = "devops-vnet"
}

variable "subnet_name" {
  description = "Existing subnet name"
  type        = string
  default     = "default"
}

variable "network_interface_name" {
  description = "Existing network interface name"
  type        = string
  default     = "devops225_z1"
}

variable "vm_name" {
  description = "Existing Azure Linux VM name"
  type        = string
  default     = "devops"
}

variable "admin_username" {
  description = "Admin user for SSH access to the VM"
  type        = string
  default     = "azureuser"
}

variable "public_ip_address" {
  description = "Public IP address of the VM"
  type        = string
}

variable "location" {
  description = "Azure region location"
  type        = string
  default     = "swedencentral"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "tags" {
  description = "Common tags for all resources"
  type        = map(string)
  default = {
    "Project"     = "AI-Travel-Planner"
    "Environment" = "Production"
    "ManagedBy"   = "Terraform"
    "Owner"       = "DevOps-Team"
  }
}
