variable "resource_group_name" {
  description = "Existing resource group that contains the VM and networking resources."
  type        = string
  default     = "devops"
}

variable "virtual_network_name" {
  description = "Existing virtual network name."
  type        = string
  default     = "devops-vnet"
}

variable "subnet_name" {
  description = "Existing subnet name."
  type        = string
  default     = "default"
}

variable "network_interface_name" {
  description = "Existing network interface name."
  type        = string
  default     = "devops225_z1"
}

variable "vm_name" {
  description = "Existing Azure Linux VM name."
  type        = string
  default     = "devops"
}

variable "admin_username" {
  description = "Admin user for SSH access to the VM."
  type        = string
  default     = "azureuser"
}

variable "ssh_public_key_path" {
  description = "Path to the public SSH key used for VM authentication if the VM is recreated later."
  type        = string
}

variable "public_ip_address" {
  description = "Existing public IP address of the VM."
  type        = string
  default     = "172.160.248.100"
}